$(document).ready(function () {
  function toast(str) {
    $("#body_toast").html(str);
    $(".toast").toast("show");
  }
  $("#toast").on("show.bs.toast", function () {
    $("#toast-row").css("z-index", 9999999);
  });
  $("#toast").on("hidden.bs.toast", function () {
    $("#toast-row").css("z-index", -1);
  });

  getData();

  $("#btnThem").click(function () {
    $("#msv").val("");
    $("#ho_ten").val("");
    $("#lop").val("");
    $("#sdt").val("");
    $("#ngay_sinh").val(null);
    $("#dia_chi").val("");
    $("#image").removeAttr("src").width(0).height(0);
  });

  $("#btnLuu").click(function () {
    let msv = $("#msv").val();
    let ho_ten = $("#ho_ten").val();
    let lop = $("#lop").val();
    let sdt = $("#sdt").val();
    let ngay_sinh = $("#ngay_sinh").val();
    let dia_chi = $("#dia_chi").val();
    let image = $("#image").attr("src");

    if (msv.trim() == "") {
      toast("Chưa nhập mã sinh viên");
      return;
    }
    if (ho_ten.trim() == "") {
      toast("Chưa nhập họ tên");
      return;
    }
    if (lop.trim() == "") {
      toast("Chưa nhập lớp");
      return;
    }

    $.ajax({
      type: "POST",
      url: "/api/student/add",
      data: { msv, ho_ten, lop, sdt, ngay_sinh, dia_chi, image },
      dataType: "json",
      success: function (response) {
        toast(`Thêm sinh viên ${ho_ten} thành công`);
        getData();
      },
      error: function (err) {
        toast(`có lỗi xảy ra khi thêm sinh viên ${ho_ten}`);
      },
    });
    $("#myModal").modal("hide");
  });
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#image").attr("src", e.target.result).width(300).height(400);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function getData() {
  $.ajax({
    type: "GET",
    url: "/api/student",
    data: [],
    dataType: "json",
    success: function (response) {
      let data = response.data;
      let body = "";
      let stt = 1;
      for (let sv of data) {
        body += `
                    <tr>
                        <td>${stt++}</td>
                        <td>${sv.ho_ten}</td>
                        <td>${sv.msv}</td>
                        <td>${sv.lop}</td>
                        <td><img src='${
                          sv.image
                        }' style="max-width:150px; height:auto;" alter='${
          sv.ho_ten
        }'/></td>
                        <td>
                            <div><a href='./chitiet?id=${
                              sv.msv
                            }'}'><i class="fa fa-eye"></i>Xem chi tiết</a></div>
                            <div style='cursor:pointer; color:red;' onclick=deleteSinhVien(${
                              sv.msv
                            })><i class="fa fa-trash"></i>Xóa</div>
                        </td>
                    </tr>
                `;
      }
      $("#table_body").html(body);
    },
  });
}

function deleteSinhVien(id) {
  $.ajax({
    type: "DELETE",
    url: `/api/student/${id}`,
    data: [],
    dataType: "json",
    success: function (response) {
      $("#body_toast").html("Xóa sinh viên thành công");
      $(".toast").toast("show");
      getData();
    },
  });
}
