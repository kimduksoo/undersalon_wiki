$( document ).ready(function() {
    var holder = $('#holder:first').first()[0];
     
    holder.ondragover = function () { this.className = 'hover'; return false; };
    holder.ondragend = function () { this.className = ''; return false; };
    holder.ondrop = function (e) {
        this.className = '';
        e.preventDefault();
        readfiles(e.dataTransfer.files);
    }

     
    function readfiles(files) {
        var formData = new FormData();
        formData.append('f_data', files[0]);
     
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/upload');
        xhr.send(formData);
        xhr.responseType = 'json';
        xhr.onload = function finish(req) {
            if(xhr.response.code == 200) {
                previewfile(files[0], xhr.response.result)
                console.log(event);
            } else {
                alert(xhr.response.message + xhr.response.result);
            }

            console.log(event);
        };
    }
     
    function previewfile(file, result) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var image = new Image();
            image.src = event.target.result;
            image.width = 100; // a fake resize
            holder.appendChild(image);

            image.onclick = function () {
                console.log("text click");
                var content = $('#content')[0];

                var selectionStart = content.selectionStart;
                var selectionEnd = content.selectionEnd;

                $('#content').val($('#content').val() + '[['+result.filetag+']]');

                content.selectionStart = selectionStart;
                content.selectionEnd = selectionEnd;
            }
        };

        reader.readAsDataURL(file);
    }
});