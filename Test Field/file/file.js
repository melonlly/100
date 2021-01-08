const data = {};

function onFileChange(fileInput) {
    const file = fileInput.files[0];
    console.log(file);
    data.file = file;
}

// 上传
function upload() {
    const headers = new Headers();
    // headers.append("Content-Type", "application/json");
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("msg", "melon");
    console.log(formData);
    fetch("http://localhost:3000/file/upload", {
        method: "post",
        mode: "cors",
        headers: headers,
        body: formData,
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    return false;
}

// 下载
function download() {
    console.log(`download~~~~`);
    // const headers = new Headers();
    // headers.append("Content-Type", "application/json");
    // fetch("http://localhost:3000/file/download", {
    //     method: "post",
    //     mode: "cors",
    //     body: JSON.stringify({
    //         id: "upload_0f63b135bc79ddcbf07591438949fc34_melon_chiken.png",
    //     }),
    //     headers,
    // })
    //     .then((res) => res.blob())
    //     .then((blob) => {
    //         console.log(blob);
    //         var alink = document.createElement("a");
    //         alink.style.display = "none";
    //         alink.href = window.URL.createObjectURL(blob);
    //         console.log(alink.href);
    //         // alink.download = res.headers.get("Content-Disposition"); // 设置文件名
    //         alink.download =
    //             "upload_0f63b135bc79ddcbf07591438949fc34_melon_chiken.png";
    //         document.body.appendChild(alink);
    //         alink.click();
    //         URL.revokeObjectURL(alink.href); // 释放URL 对象
    //         document.body.removeChild(alink);
    //     });
}

export {
    data,
    onFileChange,
    upload,
    download
};
