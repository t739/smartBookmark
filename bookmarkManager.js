$(document).ready(function(){
fetchData("");
fetchTags();

});
function fetchData(selectedTag){
   
    $.ajax({
        type :'GET',
        url:'https://localhost:44373/api/bookMark/getBookMarks',
        data:{tags:selectedTag}
    
    }).done(function(data){
        
        var bookmarks="";
       
        var dataFetched ="";
        for(var i =0;i<data.length;i++){
           
            dataFetched=`<div>
                    <img src="https://randomuser.me/api/portraits/men/1.jpg" >
                    <h3>`+data[i].title+`</h3>
                    <p>`+data[i].notes+`
                         </p>`;
                         for(var j=0;j<data[i].tags.length;j++){
                            dataFetched+=` <div>`+data[i].tags[j]+`</div>`
                         }
                   
                         dataFetched+=`</div>`;
                         bookmarks+=dataFetched;       
        }
        console.log(bookmarks);
        $("#mainContent").append(bookmarks);
    }).fail(function(){
        console.log("failed");
    })
}
function fetchTags(){
    $.ajax({
        type :'GET',
        url:'https://localhost:44373/api/bookMark/getTags'
    }).done(function(data){
        
        var bookmarks="";
       
        var dataFetched ="";
        for(var i =0;i<data.length;i++){
           
            dataFetched=`<div>`+data[i]+
                    `</div>`;
                         bookmarks+=dataFetched;       
        }
        console.log(bookmarks);
        $("#tagsContent").append(bookmarks);
        $( "#searchTags" ).autocomplete({ 
            source: data 
        
      /* #tthe ags is the id of the input element 
      source: tags is the list of available tags*/ 
        
        
          }); 
    }).fail(function(){
        console.log("failed");
    })
}