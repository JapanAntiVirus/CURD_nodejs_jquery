$(document).ready(function () {
    function toast(str) {
        $('#body_toast').html(str)
        $('.toast').toast('show');
    }
    $('#toast').on('show.bs.toast', function () {
        $('#toast-row').css('z-index', 9999999);
    });
    $('#toast').on('hidden.bs.toast', function () {
        $('#toast-row').css('z-index', -1);
    });

    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    $.ajax({
        type: "GET",
        url: `/api/student/${id}`,
        data: [],
        dataType: "json",
        success: function (response) {
            console.log(response)
            let data = response.data;
            $('#msv').html(data.msv);
            $('#ho_ten').html(data.ho_ten);
            $('#lop').html(data.lop);
            $('#ngay_sinh').html(data.ngay_sinh);
            $('#dia_chi').html(data.dia_chi);
            $('#sdt').html(data.so_dien_thoai);
            $('#image').attr('src', data.image);
        },
        error: function(err){
            toast("Có lỗi xảy ra");
            setTimeout(()=>{
                window.location.href = '/';
            })
        }
    });
});