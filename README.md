# preload.js
PreloaderJS is a simple JS preloader. Its purpose is to allow the developer to be sure all necessary media is loaded before running the web app. If necessary, the developer can set a timeout if it needs to load within a certain time.

# Requirements
It requires jQuery and is tested with v1.8.2.

# Browser support
It runs on Google Chrome v22, Firefox v16.01 and Safari v6.01. It's not tested with IE whatsoever.

# Function reference
Not much to say. Check out the example for all necessary functions and options.

# Example

	$(document).ready(function()
	{
		var preloader
		preloader = new Preloader({
		    // Timeout if content isn't completely loaded within 2000ms
		    // Set to 0 if there should be no timeout
		    timeout : 2000
		    
		    // Callback function to execute when all items are loaded
			finishedCallback : function()
			{
				console.log("Finished");
			},
			
			// Callback function to execute when a timeout has occurred
			timeoutCallback : function()
			{
				console.error("Timed out!");
			},
			
			// This function will be called for each loaded item
			loadedItemCallback : function(itemNum, totalNumItems)
			{
				console.log("Item " + itemNum + " of " + totalNumItems);
			}
		});
		
		// Add item with corresponding HTML tag and URL
		preloader.addItem('img', 'http://lorempixel.com/400/200/');
		preloader.addItem('img', 'http://lorempixel.com/403/200/');
		preloader.addItem('img', 'http://lorempixel.com/402/200/');
		preloader.addItem('img', 'http://lorempixel.com/401/200/');
	
		preloader.start();
	});
	
# Changelog

## v0.1 - 2012-10-22
* First version

# License

Copyright (c) 2012, Erik Hedberg
All rights reserved.

Redistribution and use in source and binary forms,
with or without modification, are permitted provided
that the following conditions are met:

- Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.

- Any redistribution, use, or modification is done solely for personal 
  benefit and not for any commercial purpose or for monetary gain.

THIS SOFTWARE IS PROVIDED BY THE PROJECT AND CONTRIBUTORS ''AS IS'' AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED.  IN NO EVENT SHALL THE PROJECT OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
SUCH DAMAGE.