//listener for form submission

document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){
    
    
        //get form values
    var  siteName = document.getElementById('siteName').value
    var siteUrl = document.getElementById('siteUrl').value
    var bookmark = {
        name: siteName,
        
        url: siteUrl
    }
    if(!siteName || !siteUrl){
        alert("Please Fill in the form ");
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL')
    }

        //local storage test
        // localStorage.setItem('test','Hello World')
        // console.log(localStorage.getItem('test'))
        // localStorage.removeItem('test')
        //prevent from submitting
    if(localStorage.getItem('bookmarks')==null){
            //initializing the array 
        var bookmarks = []
        bookmarks.push(bookmark);
        //save to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }
    else{
        //get bookmarks from local storage

        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //it is initally saved as string
        //adding the bookmark
        bookmarks.push(bookmark);
        //saving back to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    //clearform
    document.getElementById('myForm').reset();
    e.preventDefault();

}

function fetchBookmarks(){
    var bookmark = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmark)
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = "";
    for(var i=0;i< bookmark.length; i++){
        var name = bookmark[i].name;
        var url = bookmark[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                       '<h3>'+name+
                                       '<a class="btn btn-success" target="_blank" href="'+url+'">Visit</a>'+
                                       '<a onClick ="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="" >Delete</a>'
                                       '</h3>'+
                                       '</div>'

    }
}

function deleteBookmark(url){
    //get bookmark fro storage
    var bookmark = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0;i< bookmark.length; i++){
        if(bookmark[i].url==url){
            bookmark.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmark));
}