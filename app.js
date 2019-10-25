const url = "docs/c4611_sample_explain.pdf";

let pdfDoc = null,
  pageNum = 1,
  pageIsRendering = false,
  pageNumIsPending = null;

const scale = 1.5,
  canvas = document.querySelector("#pdf-render"),
  ctx = canvas.getContext("2d");

//Render The Page
const renderPage = num => {
  pageIsRendering = true;

  //Get Page
  pdfDoc.getPage(num).then(page =>{
    //Set Scale
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderCtx = {
      canvasContext: ctx,
      viewport
    }

    page.render(renderCtx).promise.then(() =>{
      pageIsRendering = false;
    });
  });

};

//Get Document
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
  pdfDoc = pdfDoc_;

  document.querySelector("#page-count").textContent = pdfDoc.numPages;
});
