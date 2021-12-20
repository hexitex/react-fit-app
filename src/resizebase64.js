import { EventEmitter } from "eventemitter3";
export var newImgEvent= new EventEmitter();
 export function resizeImg (datas, maxWidth, maxHeight)
    {
         // Max size for thumbnail
        if(typeof(maxWidth) === 'undefined')  maxWidth =128;
        if(typeof(maxHeight) === 'undefined')  maxHeight = 128;
        // We create an image to receive the Data URI
        var img = document.createElement('img');
       
        // When the event "onload" is triggered we can resize the image.
       // module export= newImgEvent;

        img.onload = function()
            {        

                // We create a canvas and get its context.
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
              
                  // Determine new ratio based on max size
                var ratio = 1;
                if(img.width > maxWidth)
                    ratio = maxWidth / img.width;
                else if(img.height > maxHeight)
                    ratio = maxHeight / img.height;

                // We set the dimensions at the wanted size.
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;

                // We resize the image with the canvas method drawImage();
                ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
                // tell main app img is ready
                newImgEvent.emit('imgready',canvas.toDataURL('png'));
            };

        // We put the Data URI in the image's src attribute
        img.src = datas;
    };
