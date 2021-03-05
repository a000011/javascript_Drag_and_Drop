//объявление переменных
let dropArea = document.getElementById('DropFileForm')
let btnSave = document.getElementById("save")
const canvas = document.querySelector("#canvas")
let original_image = ""
//создание контекста канваса
ctx = canvas.getContext("2d")

//создание класса шапки
class Hat{
  //конструктор шапки
  constructor(type){
    this.src = "images\\accessories\\" + type 
    this.x = 170
    this.y = 20
    this.w = 100
    this.h = 100
    this.rotate = 0
  }
  //метод, возвращающий картинку
  getImage(){
    var image = new Image()
    image.src = this.src
    return(image)
  }
  
}


class HatType{
    static Classic = "HAT_1.png" 
    static Mexican = "HAT_2.png"
    static Xmas = "HAT_3.png"
    static Hat = "HAT_4.png" 
}




function preventDefaults(event) {
  event.preventDefault()
  event.stopPropagation()
}


dropArea.addEventListener('dragenter', fDragenter, false)
dropArea.addEventListener('dragleave', fDragleave, false)
dropArea.addEventListener('drop', fDrop, false)




function fDragenter(){
  
  dropArea.classList.add('highlight')
}


function fDragleave(){
  dropArea.classList.remove('highlight')
}


function fDrop(e) {
  let files = e.dataTransfer.files

  var file = files[0]
  var img = document.createElement("img")
  img.classList.add("obj")
  img.file = file
  var reader=new FileReader()
  reader.onload=(function(aImg){
    return function(e) {
        aImg.onload=function(){
            original_image = aImg
            ctx.drawImage(aImg,0,0,460,600)
        }
        aImg.src = e.target.result
    }
  })(img)
  reader.readAsDataURL(file)
}

function handleFiles(files) {
  ([...files]).forEach(uploadFile)
}

var hat
function hats(id){
  var path
  switch(id){
    case 1:
      path = HatType.Classic   
    break
    case 2:
      path = HatType.Mexican   
    break
    case 3:
      path = HatType.Xmas   
    break
    case 4:
      path = HatType.Hat   
    break
  }
  hat = new Hat(path)
  drawHats(hat)
}



function drawHats(hat){
  //ctx.rotate(0)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(original_image,0,0,460,600)

  ctx.translate(hat.x + hat.w/2,hat.y + hat.h/2)

  ctx.rotate(hat.rotate* Math.PI / 180)
  ctx.drawImage(hat.getImage(),0 - hat.w/2,0 - hat.h/2,hat.w,hat.h)
  ctx.rotate(-(hat.rotate* Math.PI / 180))

  ctx.translate(-hat.x - hat.w/2,-hat.y - hat.h/2)
  


}

function savePicture(){
  var link = document.createElement('a')
  link.download = 'filename.png'
  link.href = document.getElementById('canvas').toDataURL()
  link.click()
}