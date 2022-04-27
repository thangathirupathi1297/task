


var emarr=[{
    name:'thirupathi',
    location:'Chennai',
    id:'fdfgdfgd'
},
{
    name:'thirupathi',
    location:'Chennai1',
    id:'abc123'
},{
    name:'Chennai',
    location:'Chenna23i',
    id:'abc124'
}]


const loadEvent=()=>{

    fetch('/publish',{
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(response=>{
          response.json().then(result=>{
            console.log(result)
            if(result.length>0){
                document.getElementById('notfound').style.display='none'
                document.getElementById('found').style.display='block'
              result.map(i=>{
                    containerCreate(i.name,i.location,i._id)
                })
        
            }else{
                document.getElementById('notfound').style.display='block'
            }
          }
            ).catch(err=>{
                console.log(err)
            })
      })

   
   
}


const createPublishers=()=>{
    var createBox=document.getElementById('createbox')
    document.getElementById('method').innerText='Create'
    var btn=document.getElementById('eventBtn')
    btn.innerHTML='<button onclick="addpublishers()">Add</button>'
    createBox.style.display="block"
}
const closeCreate=()=>{
    var createBox=document.getElementById('createbox')
    document.getElementById('method').innerText='Create'
    createBox.style.display="None"
}

const addpublishers=()=>{
    document.getElementById('found').style.display='block'
    document.getElementById('notfound').style.display='none'
    var name=document.getElementById('name')
    var  location=document.getElementById('location')
   var id = (new Date().getTime()).toString(36)
  if(name.value&&location.value){

    fetch('/create',{
        method:'post',
        headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            name:name.value,
            location:location.value,
          })
    }).then(response=>{
        response.json().then(result=>{
            console.log(result,'result',result['_id'])
            containerCreate(result.name,result.location,result._id)
            name.value=''
            location.value=''
        })
    }).catch(err=>{console.lo(err,'err')})
  }
  else{
    alert('field is empty')
  }

}

const containerCreate=(name,location,id)=>{
    var newDiv= document.createElement('div')
    newDiv.classList='lists container'
    newDiv.id='list'+id
    newDiv.innerHTML=`<input value=${name} disabled id=${'name'+id}>
   <input value= ${location} disabled id=${'location'+id}>
   <div>
       <button onclick=Editbtn('${name}','${location}','${id}')>
           Edit
       </button>
   </div>
   <div>
       <button onclick='deleteBtn("${id}")'>
           Delete
       </button>
   </div>`

   document.getElementById('found').appendChild(newDiv)
   
  
}

const Editbtn=(na,lo,id)=>{
    document.getElementById("createbox").style.display='block'
    var name=document.getElementById('name'+id).value;
    var location=document.getElementById('location'+id).value;
    document.getElementById('method').innerText='Edit'

    document.getElementById('name').value=name;
    document.getElementById('location').value=location;
    var btn=document.getElementById('eventBtn')
    btn.innerHTML=`<button onclick="editsubmit('${id}')">Update</button>`

}
const editsubmit=(id)=>{
    var name=document.getElementById('name').value
    var location=document.getElementById('location').value
    if(name&&location)
    {
        fetch('/edit',{
            method:'put',
            headers:{
                "Content-Type": "application/json",
              },
              body:JSON.stringify({
                name:name,
                location:location,
                id:id
              })
        }).then(response=>{
            response.json().then(result=>{
          console.log(result)
            })
        }).catch(err=>{console.lo(err,'err')})
        document.getElementById('name'+id).value=name;
        document.getElementById('location'+id).value=location;
    }else{
       alert('field is empty')
    }
   
    document.getElementById('name').value='';
    document.getElementById('location').value='';
    closeCreate()
}

const deleteBtn=(id)=>{

    fetch('/delete/'+id,{
        method:'delete',
        headers:{
            "Content-Type": "application/json",
          }
    }).then(response=>{
        console.log(response)
    }).catch(err=>{console.log(err)})

   var remove= document.getElementById('list'+id)
   document.getElementById('found').removeChild(remove)
   closeCreate()
}