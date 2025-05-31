function sum(params) {
    if (!params) {
        throw new Error('No params')
    }
    if (!Array.isArray(params)) {
        throw new Error('params not array')
    }
    let sum = 0
    for (const el of params) {
        if (isNaN(el)) {
            continue
        }
        sum += el
    }
    return sum
}

function mul(params) {
    if (!params) {
        throw new Error('No params')
    }
    if (!Array.isArray(params)) {
        throw new Error('params not array')
    }
    let mul = 1
    for (const el of params) {
        if (isNaN(el)) {
            continue
        }
        mul *= el
    }
    return mul
}

function div(params) {
    if (Object.keys(params).length > 2) {
        throw new Error('wrong params')
    }
    if (isNaN(params.x) || isNaN(params.y)) {
        throw new Error('x or y is nan')
    }
    if (params.y == 0) {
        throw new Error('dividing by zero')
    }
    const res = params.x / params.y
    return res
}

function proc(params) {
    if (Object.keys(params).length > 2) {
        throw new Error('wrong params')
    }
    if (isNaN(params.x) || isNaN(params.y)) {
        throw new Error('x or y is nan')
    }
    if (params.y == 0) {
        throw new Error('dividing by zero')
    }
    const res = params.x / params.y * 100
    return res
}

module.exports = {
    sum,
    mul,
    div,
    proc
}