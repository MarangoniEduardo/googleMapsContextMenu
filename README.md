#googleMapsContextMenu  

Google Maps context menu for Google Maps API

**CDN:**
https://cdn.jsdelivr.net/gh/MarangoniEduardo/googleMapsContextMenu/googleMapsContextMenu.min.js

**Documentation:**

to initialize use <code>init()</code>;

The layout, which needs to be an array of objects, can be built such as:
       
    // The icon parameter is optional
    let layout = [
        {label: 'Test', icon: 'path/to/your/image.png', id: 'googleMapsContextMenu-zoomIn',
             event: {
                 'click': () => {
                     this.map.setZoom(parseInt(this.map.getZoom()) + 1);
                 }
             }
         },
         {
             label: 'Zoom Out', icon: 'path/to/your/image.png', id: 'googleMapsContextMenu-zoomOut',
             event: {
                 'click': () => {
                     this.map.setZoom(parseInt(this.map.getZoom()) - 1);
                 }
             }
         }
     ];
     
To make instance of it in your implementation you'll need to do it like this:
    
    //map being your reference to your google maps map object
    //layout being your array of objects that we just created
    //markers being an array of your markers that you somehow want to manipulate
    //if your themeColor is not defined it will get the default one
    //appendDefault is for appending zoom In and zoom Out functions by default, if empty it will append
    
    let themeColor = `blue`;
    let appendDefault = false;
    
    let instanceForMyImplementation = new googleMapsontextMenu(map, layout, markers, themeColor, appendDefault);

**Useful data you can get:**  
-> <code>instanceForMyImplementation.currentInstance</code> gets the contextMenu DOM element reference.
<br/>
-> <code>instanceForMyImplementation.markers</code> gets the markers you've passed, if you did.
<br/>
-> <code>instanceForMyImplementation.event</code> gets the current event data.
<br/>
-> <code>instanceForMyImplementation.eventCoordinate</code> gets the current event map coordinates.
<br/>
-> <code>instanceForMyImplementation.clickedMarker</code> gets the current right-clicked marker:
<br/>



**Built-in features:**  
-> The <code>event: {'eventName' => () => {}}</code> supports all the js native events.  
<br/> 
-> <code>add()</code> is for adding new rows to your context menu:
    
    instanceForMyImplementation.add({
         label: 'Go back in time', icon: '', id: 'my-id',
         event: {
             'click': () => {
                 this.map.setZoom(parseInt(this.map.getZoom()) - 1);
             }
         }
    })
    
-> <code>remove()</code> is that you can remove some row by id:
    
    instanceForMyImplementation.remove(`my-id`);

-> <code>removeAdded()</code> remove all added outside of the constructor:

    instanceForMyImplementation.removeAdded();
    
-> <code>updateMarkers()</code> overwrites the marker(s) and reset their events, letting you pass a layout for the markers:

    instanceForMyImplementation.updateMarkers(myMarkersArray, [
        {
            label: 'Delete Marker', icon: '', id: 'my-id',
            event: {
                'click': () => {
                    mydeleteMarkerFx();
                }
            }
        },
        {
            label: 'Move marker', icon: '', id: 'my-id-2',
                event: {
                    'click': () => {
                        mymoveMarkerFx();
                    }
                }
        }
    ]);
    
-> <code>destroy()</code> destroys the DOM element for the context menu and all it's children:

    instanceForMyImplementation.destroy();
