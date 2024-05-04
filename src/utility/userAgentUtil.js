async function getUserAgentInfoWithDownloadSpeed(userAgentString) {
    // Identify OS (Mobile and Computer)
    const osRegex = /(Windows NT \d+\.\d+|Mac OS X \d+(\_\d+)?|Android|iPhone|iPad|Windows Phone)/; // Combined regex for mobile and computer OS
    const osMatch = userAgentString.match(osRegex);
    const operatingSystem = osMatch ? osMatch[0] : "Unknown";

    let osType;

    osType = operatingSystem;

    if(operatingSystem === "iPhone" || operatingSystem === "iPad"){
      osType="IOS";
    }else if(operatingSystem === "Windows Phone"){
      osType="Android";
    }
  
    // Identify Browser
    const browserRegex = /(Chrome|Firefox|Safari|Edge)\/\d+(\.\d+)+/; // Regex to match popular browsers
    const browserMatch = userAgentString.match(browserRegex);
    const browser = browserMatch ? browserMatch[1] : "Unknown";

    // Log OS and Browser to Console
    console.log("Operating System:", operatingSystem);
    console.log("OS Type:", osType);
    console.log("Browser:", browser);
  
    // Download Speed Calculation
    const startTime = performance.now(); // Start time of download
    try {
      // const response = await fetch('https://finalar.github.io/models/chess/M/Chess01.glb');
      const response = await fetch('https://finalar.github.io/models/chess/M/Chess01.glb?' + Date.now());
      const endTime = performance.now(); // End time of download
      
      const fileSize = parseInt(response.headers.get('Content-Length')); // Size of the downloaded file in bytes
      const downloadTime = endTime - startTime; // Time taken for download in milliseconds
      const downloadSpeed = fileSize / (downloadTime / 1000); // Download speed in bytes per second
      
      console.log("Download Speed:", downloadSpeed, "bytes/second");
      
      // Convert download speed to appropriate unit (e.g., kilobytes per second)
      const downloadSpeedKbps = downloadSpeed / 1024; // Download speed in kilobytes per second
      console.log("Download Speed (KB/s):", downloadSpeedKbps);

        // Convert download speed to appropriate unit (e.g., megabytes per second)
        const downloadSpeedMbps = downloadSpeed / (1024*1024); // Download speed in kilobytes per second
        console.log("Download Speed (MB/s):", downloadSpeedMbps);
      
        caches.keys().then(cacheNames => {
          console.log("List of cache names:");
          cacheNames.forEach(cacheName => {
            console.log(cacheName);
          });
        }).catch(error => {
          console.error("Error listing cache names:", error);
        });

      // Clear the cached file
      // const cacheName = 'your-cache-name'; 
      // await caches.open(cacheName).then(cache => cache.delete('https://finalar.github.io/models/chess/M/Chess01.glb'));
      // Return Data Object with OS, Browser, and Download Speed
      return {
        os: osType,
        browser: browser,
        downloadSpeed: downloadSpeedMbps // Return download speed in kilobytes per second
      };
    } catch (error) {
      console.error("Error downloading file:", error);
      // Return Data Object with OS and Browser only if download fails
      return {
        os: osType,
        browser: browser,
        downloadSpeed: "Error" // Indicate error in download speed
      };
    }
  }

export default getUserAgentInfoWithDownloadSpeed;