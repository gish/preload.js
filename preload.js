/**
 * A preloader with timeout support
 */
;!function($, window)
{
	"use strict";
	
	var Preloader = function(options)
	{
		this.items = [];

		this.defaults = {
			timeout            : 0,                 // Time in ms before timeout
			loadedItemCallback : function(n, t) {}, // Callback for each loaded item
			finishedCallback   : function() {},     // Callback for finished loading
			timeoutCallback    : function() {}      // Callback for time out
		};
		this.options = $.extend(this.defaults, options);

		this.numTotalItems = 0;
		this.numLoadedItems = 0;

		this.finished = false;
		this.timedout = false;

		this.watchdog = null;
	}

	Preloader.prototype = {
		/**
		 * Add an item
		 */
		addItem : function(tag, src)
		{
			var item = { tag : tag, src : src };
			this.items.push(item);
			this.numTotalItems++;
		},
		/**
		 * Start preloading
		 */
		start : function()
		{
			if (this.options.timeout > 0)
			{
				this.startWatchdog();
			}
			this.step();
		},
		/**
		 * One step is one item to load
		 */
		step : function()
		{
			var self = this;
			var item;
			item = this.items.pop();
			
			if (!item)
			{
				return
			}

			// Preload item
			if (item.tag == 'audio' || item.tag == 'video')
			{
				var $tag =  $('<' + item.tag + '>', {
					src  : item.src
				});
				$tag.bind('canplay', function()
				{
					// Remove the listener since FF for some reason triggers the event twice
					$tag.unbind('canplay');
					self.preloadCallback();
				});
			}
			else
			{
				$('<' + item.tag + '>', {
					src  : item.src,
					load : function()
					{
						self.preloadCallback();
					}
				});
			}
		},
		/**
		 * Start watchdog
		 */
		startWatchdog : function()
		{
			var self = this;
			if (!this.watchdog)
			{
				this.watchdog = setTimeout(function()
				{
					self.callWatchdog()
				}, this.options.timeout)
			}
		},
		/**
		 * Call watchdog when we've timed out
		 */
		callWatchdog : function()
		{
			this.timedout = true;
			this.options.timeoutCallback();
		},
		/**
		 * Callback for loaded item
		 */
		preloadCallback : function()
		{
			// Did we time out?
			if (this.timedout)
			{
				return;
			}
			
			this.numLoadedItems++;
			
			// Callback for loaded item
			this.options.loadedItemCallback(this.numLoadedItems, this.numTotalItems);

			// Are all items loaded?
			if (this.items.length == 0)
			{
				if (!this.finished)
				{
					clearTimeout(this.watchdog);
					this.finished = true;
					this.options.finishedCallback();
				}
			}
			// If not, there are more to load
			else
			{
				this.step();
			}
		}
	};
	
	window.Preloader = Preloader;
}(window.jQuery, this);
