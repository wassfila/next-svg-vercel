# next-svg
svg pan zoom as a react component on next js with adjustment buttons and Modal

# Spec
* svg loaded dynamically from json input filenames
* panzoom object is disabled by default to allow window wheel vertical scroll
* panzoom activated only after first mouse down on image or adjutment buttons
* activation is show with Box higher shadow and border solid style
* cursor `grab` is shown when panzoom is active
* fit button allow to adjust the image in the viewing area, fitting width or height depending on the ratio
* first mouse down can be continued to pan the image
* stop button can deactivate the panzoom to gain vertical scroll ability again
* a new reactivation after stop will reset the position
* open Modal button open a full window Modal fitted image with active panzoom
* Modal is not 100% on width and height but a small percentage of darkened are is left to click on and exit from the modal
* Keyboard escape key also allows to close the modal

## decisions
* it is accepted to rely on javascript dynamic loading of svg instead of the `embed` or `object` due to the limitation of panzoom lib of not acting on shadow svg documents
* it is accepted that images are not adjusted by default and css styling and svg properties are used to define the default adjustment e.g. without `width=900px`
* mouse leave cannot be used to deactivate the panzoom due to the activation limitation orresetting the image position

## TODOs
* handle images not SVGs only

## Limitations
* in Chrome touch generates : "Intervention unable to preventdefault inside passive event"
* cursor `grab` does not show on first mouse down and drag, only after release
* timeout of 1 ms needed for second Modal open otherwise svg is undefined
# Code description
## working sample
* `inline.js` : using `panzoom` and `react-inlinesvg`.
* `panzoom` : https://github.com/anvaka/panzoom
    * this lib can only pan zoom `div` elements on top of images or svg not the image or svg itself which has the pitfall of discarding svgs inside shadow documents embedded with `object` or `embed`, therefore SVGs have to be injected and handle load event.
* using panzoom with react : https://github.com/anvaka/panzoom/issues/212
* `react-inlinesvg` : https://github.com/gilbarbara/react-inlinesvg
    * the reason why this lib is used is not among the ones listed in the readme, rather simply for the capability of injecting a dynamically loaded svg file which filename come from a variable parameter
    * For details about other attempts that did not work see `import.js`, `image.js` and `object.js` use cases description below.

## other options with limitations
* `import.js` : cannot pass file as param, both import and dynamic import fail with file as variable
* `image.js` : file as param ok, mouse events ok, loss svg of text search and interactivity
* `object.js` :
    * can take file as param
    * using component `PanZoomSVG`
    * uses `<object/>` tag which creates a shadow Document, svg can be obtained with `getSVGDocument()` but mouse events are not paased through
    * object is loaded on runtime once the src is updated and notifies with `onLoad`, therefore SVG comp can only be initialized after chil onLoad which needs to be passed with a state, and checked on the useEffect (that runs client side only)

## other pan zoom integrations
* `react-svg-pan-zoom` : https://github.com/chrvadala/react-svg-pan-zoom
    * needs to select tool before pan can start, separate pan and zoom, hidden background gets a different color than the firstly visible background
* `svg-pan-zoom` : https://github.com/bumbu/svg-pan-zoom
    * works with shadow document (embed, object)
    * cannot be imported in nextjs due to usage of window (front end only) in the module
    * Browser only integration needs to return with a `Script` tag referencing a manually copied .js
    * svg does not pan all over the parent but in the firstly defined creation window

## SVG files
* files with top svg element containing width and height attributes will have fixed default width and height
* svg files without and with viwBox only will have responsive width
* `svg.getBoundingClientRect();` does not react immediatly so that right after calls to `zoomAbs()` or `moveTo()` the returned value is the old one before the calls. One way to solve this is to avoid using it and precompute what the returned value is supposed to be depdning on if the top svg has a fixed width or fits to parent width

