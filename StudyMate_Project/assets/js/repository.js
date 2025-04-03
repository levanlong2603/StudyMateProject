$(document).ready(function() {
    // Kiểm tra đăng nhập
    const user = AuthModule.checkLogin();
    if (!user) {
        window.location.href = 'login.html';
    } else {
        $('#userName').text(user.name);
    }

    // Xử lý đăng xuất
    $('#logoutBtn').click(function() {
        AuthModule.logout();
    });

    // Mở modal upload
    $('#uploadBtn').click(function() {
        $('#uploadModal').show();
    });

    // Đóng modal
    $('.close-modal').click(function() {
        $('#uploadModal').hide();
    });

    // Đóng modal khi click bên ngoài
    $(window).click(function(event) {
        if ($(event.target).is('#uploadModal')) {
            $('#uploadModal').hide();
        }
    });

    // Xử lý upload form
    $('#uploadForm').submit(function(e) {
        e.preventDefault();
        
        // Lấy dữ liệu form
        const formData = {
            title: $('#docTitle').val(),
            category: $('#docCategory').val(),
            type: $('#docType').val(),
            description: $('#docDescription').val(),
            file: $('#docFile')[0].files[0]
        };
        
        // Validate
        if (!formData.title || !formData.category || !formData.type || !formData.file) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }
        
        // Ở đây bạn sẽ gửi dữ liệu lên server
        // Đây chỉ là demo nên chỉ log ra console
        console.log('Dữ liệu tài liệu:', formData);
        
        // Hiển thị thông báo thành công
        alert('Tài liệu đã được gửi để xét duyệt. Cảm ơn bạn đã đóng góp!');
        
        // Đóng modal và reset form
        $('#uploadModal').hide();
        this.reset();
    });

    // Thay đổi view (grid/list)
    $('.view-btn').click(function() {
        $('.view-btn').removeClass('active');
        $(this).addClass('active');
        
        if ($(this).hasClass('grid-view')) {
            $('.documents-grid').removeClass('list-view');
        } else {
            $('.documents-grid').addClass('list-view');
        }
    });

    // Filter by category
    $('.category-list li').click(function() {
        $('.category-list li').removeClass('active');
        $(this).addClass('active');
        // Gọi hàm filter documents
        filterDocuments();
    });

    // Filter by type
    $('.type-list li').click(function() {
        $('.type-list li').removeClass('active');
        $(this).addClass('active');
        // Gọi hàm filter documents
        filterDocuments();
    });

    // Sort documents
    $('#sortSelect').change(function() {
        // Gọi hàm sort documents
        sortDocuments($(this).val());
    });

    // Hàm filter documents (demo)
    function filterDocuments() {
        const category = $('.category-list li.active').text();
        const type = $('.type-list li.active').text();
        console.log(`Filter by: Category=${category}, Type=${type}`);
        // Thực tế sẽ gọi API hoặc filter dữ liệu local
    }

    // Hàm sort documents (demo)
    function sortDocuments(sortBy) {
        console.log(`Sort by: ${sortBy}`);
        // Thực tế sẽ sắp xếp dữ liệu theo tiêu chí
    }

    // Load documents (giả lập)
    function loadDocuments() {
        // Thực tế sẽ gọi API để lấy dữ liệu
        console.log('Loading documents...');
    }

    // Khởi tạo
    loadDocuments();
});