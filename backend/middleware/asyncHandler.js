const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;

// fn 是一个异步函数，它接受 req、res 和 next 作为参数。asyncHandler 返回一个新的函数，这个函数也接受 req、res 和 next 作为参数。在这个新函数中，我们调用 fn，并将 req、res 和 next 传递给它。然后，我们调用 Promise.resolve()，将 fn 的返回值包装在一个 Promise 中。最后，我们调用 .catch(next)，将 Promise 的错误传递给 Express 的错误处理中间件。

// 通过 asyncHandler 包装异步函数，可以确保所有未捕获的错误都能被传递给 Express 的错误处理中间件。这使得异步路由处理函数的错误处理变得更加简洁和可靠。在实际使用中，通过 asyncHandler 包装异步函数，可以减少重复的错误处理代码，并确保应用程序的稳定性。