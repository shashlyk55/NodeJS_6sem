const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const path = require("path");
const multer = require("multer");

const app = express();
const STATIC_DIR = path.join(__dirname, "static");

let webdavClient;

const upload = multer({ dest: STATIC_DIR });

app.use(bodyParser.json());

app.post("/md/:dirName", async (req, res) => {
    try {
        const dirName = req.params.dirName;

        if (await webdavClient.exists(`/dav/Koofr/${dirName}`)) {
            return res.status(408).json({
                success: false,
                error: 'file is already exists'
            })
        }

        await webdavClient.createDirectory(`/dav/Koofr/${dirName}`);
        res.status(200).json({ success: true, dirName });
    } catch (error) {
        console.error("Error creating directory:", error);
        res.status(500).json({ error: "Failed to create directory" });
    }
});

app.post("/rd/:dirName", async (req, res) => {
    try {
        const dirName = req.params.dirName;
        if (!(await webdavClient.exists(`/dav/Koofr/${dirName}`))) {
            return res.status(408).json({
                success: false,
                error: 'file does not exists'
            })
        }

        await webdavClient.deleteFile(`/dav/Koofr/${dirName}`);
        res.status(200).json({ success: true, dirName });
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).json({ error: "Failed to delete file" });
    }
});

app.post('/up/:fileName', upload.single('file'), async (req, res) => {
    try {
        const fileName = req.params.fileName;
        const tempPath = req.file.path;
        const remotePath = `/dav/Koofr/${fileName}`;

        let fileContent;
        try {
            fileContent = await fs.readFile(tempPath);
        } catch (err) {
            console.error("Error reading temp file:", err);
            return res.status(500).json({ error: "Failed to process uploaded file" });
        }

        try {
            await webdavClient.putFileContents(remotePath, fileContent, { overwrite: true });
        } catch (uploadError) {
            console.error("Error uploading:", uploadError);
            return res.status(408).json({ error: "Failed to write file to storage" });
        } finally {
            await fs.unlink(tempPath).catch(err => console.error("Error cleaning temp file:", err));
        }

        res.status(200).json({
            success: true,
            fileName: fileName,
            message: "file uploaded"
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/down/:fileName', async (req, res) => {
    try {
        const fileName = req.params.fileName;
        const remotePath = `/dav/Koofr/${fileName}`;
        const localPath = path.join(STATIC_DIR, fileName);

        const exists = await webdavClient.exists(remotePath);
        if (!exists) {
            return res.status(404).json({ error: "File not found in storage" });
        }

        const fileContent = await webdavClient.getFileContents(remotePath, { format: "binary" });

        await fs.writeFile(localPath, fileContent);

        res.download(localPath, fileName, async (err) => {
            if (err) {
                console.error("Error sending file:", err);
            }
        });
    } catch (err) {
        console.error("Error downloading file:", err);
        res.status(500).json({ err: "Failed to download file" });
    }
});

app.post('/del/:fileName', async (req, res) => {
    try {
        const fileName = req.params.fileName;
        const remotePath = `/dav/Koofr/${fileName}`;

        const exists = await webdavClient.exists(remotePath);
        if (!exists) {
            return res.status(404).json({ error: "File not found" });
        }

        await webdavClient.deleteFile(remotePath);
        res.status(200).json({ success: true, fileName });
    } catch (err) {
        console.error("Error deleting file:", err);
        res.status(500).json({ error: "Failed to delete file" });
    }
});

app.post('/copy/:source/:target', async (req, res) => {
    try {
        const source = req.params.source;
        const target = req.params.target;
        const sourcePath = `/dav/Koofr/${source}`;
        const targetPath = `/dav/Koofr/${target}`;

        const exists = await webdavClient.exists(sourcePath);
        if (!exists) {
            return res.status(404).json({ error: "Source file not found" });
        }

        await webdavClient.copyFile(sourcePath, targetPath);
        res.status(200).json({
            success: true,
            source,
            target,
            message: "File copied"
        });
    } catch (error) {
        console.error("Error copying file:", error);
        res.status(408).json({ error: "Failed to copy file" });
    }
});

app.post('/move/:source/:target', async (req, res) => {
    try {
        const source = req.params.source;
        const target = req.params.target;
        const sourcePath = `/dav/Koofr/${source}`;
        const targetPath = `/dav/Koofr/${target}`;

        const exists = await webdavClient.exists(sourcePath);
        if (!exists) {
            return res.status(404).json({ error: "Source file not found" });
        }

        await webdavClient.moveFile(sourcePath, targetPath);
        res.status(200).json({
            success: true,
            source,
            target,
            message: "File moved successfully"
        });
    } catch (error) {
        console.error("Error moving file:", error);
        res.status(408).json({ error: "Failed to move file" });
    }
});

app.post('/move', async (req, res) => {
    try {
        const { source, target } = req.body

        if (!source || !target) {
            return res.status(400).json({ error: "Invalid path format" });
        }

        const sourcePath = `/dav/Koofr/${source}`;
        const targetPath = `/dav/Koofr/${target}`;

        const exists = await webdavClient.exists(sourcePath);
        if (!exists) {
            return res.status(404).json({ error: "Source file not found" });
        }

        await webdavClient.moveFile(sourcePath, targetPath);
        res.status(200).json({
            success: true,
            source,
            target,
            message: "File moved successfully"
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `route ${req.url} not found`
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message: err.message || 'Internal Server Error',
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

    import('webdav').then(({ createClient }) => {
        console.log('creating client...');

        webdavClient = createClient(
            "https://app.koofr.net",
            {
                username: "slesarevivan1401@gmail.com",
                password: "lmjx zp9i zfcx c8fv"
            }
        );
    }).then(() => console.log('webdav connected'))
});



