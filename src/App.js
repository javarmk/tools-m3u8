import {useState} from 'react'


function App() {

  const rooturl="https://drive.google.com/uc?export=download&id=";
  

  const [m3u8Text,setM3u8Text]=useState("");
  const [tsFilesInfo,setTsFileInfo]=useState("");


  
  const [afterConvert,setAfterConvert]=useState("");

 

  const FindKeyValue=(startIndex)=>{

    return {
      
    }
  }


  //return next or null
  const getNameFromIndex=(currentIndex)=>{
    for(var i=currentIndex;i<tsFilesInfo.length;i++){
      if(tsFilesInfo[i]=="@"){
        for(var j=i+1;j<tsFilesInfo.length;j++){
          if(tsFilesInfo[j]=="$"){
            return j;
          }
        }
        return null;
      }
    }
    return null;
  }

  //return next or null
  const getIDFromIndex=(currentIndex)=>{
    for(var i=currentIndex;i<tsFilesInfo.length;i++){
      if(tsFilesInfo[i]=="$"){
        for(var j=i+1;j<tsFilesInfo.length;j++){
          if(tsFilesInfo[j]=="@"||j>=tsFilesInfo.length-1){
            if(j==tsFilesInfo.length-1){
              return (j+1);
            }
            return j;
          }
        }
        return null;
      }
    }
    return null;
  }


  const convertToNewUrl=()=>{
    var newm3u8=""+m3u8Text;    
    var startSearch=0;
    while(startSearch<=tsFilesInfo.length-1){
      var nameIndex=getNameFromIndex(startSearch);
      if(nameIndex!=null){
        var name=tsFilesInfo.substring(startSearch+1,nameIndex);
        startSearch=nameIndex;
        var idIndex=getIDFromIndex(startSearch);
        if(idIndex!=null){
          var idd=tsFilesInfo.substring(startSearch+1,idIndex);
          startSearch=idIndex;
          newm3u8= newm3u8.replace(name,rooturl+idd)
        }
      }
    }
    setAfterConvert(newm3u8);
    download(newm3u8,"films","m3u8");

    return true;
  }

  return (
    <div className="App" style={{display:"grid",columnGap:"24px",gridTemplateColumns:"auto auto"}}>
      <div className="App-header" style={{marginLeft:"30px" }}>
        <h2>Thong tin file m3u8</h2>
        <div >
          <textarea  value={m3u8Text} onChange={(e)=>{setM3u8Text(e.target.value)}} style={{fontSize: '30px'}} id="w3review" name="w3review" rows="4" cols="50"/>
        </div>
        <div >
          <textarea  value={tsFilesInfo} onChange={(e)=>{setTsFileInfo(e.target.value)}} style={{fontSize: '30px'}} id="w3review" name="w3review" rows="4" cols="50"/>
        </div>
        <button onClick={(e)=>{
          convertToNewUrl();
        }}>Convert</button>
      </div>
      <div className="App-header" style={{marginLeft:"30px" }}>
        <h2>Thong tin file m3u8</h2>
        <div >
          {afterConvert}
        </div>
        {/* <video width="320" height="240" controls>
          <source src="https://drive.google.com/file/d/1KYoB-fnGtuAEcl6ZxxLPr70mTKQQet-z/view?usp=sharing" type="video/mp4"/>
        </video> */}
      </div>
    </div>
  );
}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}


export default App;
