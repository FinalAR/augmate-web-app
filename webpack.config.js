// // webpack.config.js
// module.exports = {
//     // other webpack configuration...
//     resolve: {
//         fallback: {
//           "crypto": require.resolve("crypto-browserify"),
//           "os": require.resolve("os-browserify/browser"),
//           "path": require.resolve("path-browserify")
//         }
//       }
//   };
  
module.exports = {
    resolve: {
      fallback: {
        fs: false,
        path: false,
        crypto: false
      }
    }
  };
  