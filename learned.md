When you set the CSS `width` and `height` properties on a `<canvas>`, you
this just changes how it is displayed; the browser will scale it to be that
size when rendered. You need to set the `.width` and `.height` properties
directly in order to actually change the size of the pixel canvas (i.e. how
many pixels wide it is).
