function showHidePassword(element) {
			const passwordInput = document.querySelector('input[name="password"]');
			const eyeIcon = element.querySelector('i');

			if (passwordInput.type === 'password') {
				passwordInput.type = 'text';
				eyeIcon.classList.remove('fa-eye-slash');
				eyeIcon.classList.add('fa-eye');
			} else {
				passwordInput.type = 'password';
				eyeIcon.classList.remove('fa-eye');
				eyeIcon.classList.add('fa-eye-slash');
			}
		}

		function validasiNik(input) {
			var nik = $(input).val();
			var validasiNikElement = $('#validasiNik');

			// Regular expression to match exactly 16 digits
			var nikRegex = /^[0-9]{16}$/;

			if (!nikRegex.test(nik)) {
				validasiNikElement.text('NO KK harus terdiri dari 16 digit angka');
				$(input).addClass('is-invalid');

				// Restricts input for the set of matched elements to the given inputFilter.
				$(input).on("input", function (event) {
					this.value = this.value.replace(/[^0-9]/g, "");
				});
			} else {
				validasiNikElement.text('');
				$(input).removeClass('is-invalid');
			}
		}

		$('input[name="nik"]').on('keyup', function () {
			validasiNik(this);
		});
		document.addEventListener("DOMContentLoaded", function () {
			let menuItems = document.querySelectorAll(".main-menu .navigation > li");

			menuItems.forEach(item => {
				item.addEventListener("mouseenter", function () {
					// Tutup semua submenu lain kecuali yang sedang di-hover
					menuItems.forEach(otherItem => {
						if (otherItem !== item) {
							let submenu = otherItem.querySelector("ul");
							if (submenu) submenu.style.display = "none";
						}
					});

					// Buka submenu utama yang sedang di-hover
					let submenu = item.querySelector("ul");
					if (submenu) submenu.style.display = "block";

					// Tutup sub-submenu lain jika ada
					let subSubMenus = document.querySelectorAll(".main-menu .navigation ul ul");
					subSubMenus.forEach(sub => sub.style.display = "none");
				});

				// Tambahkan event untuk sub-submenu
				let subMenuItems = item.querySelectorAll("ul > li");
				subMenuItems.forEach(subItem => {
					subItem.addEventListener("mouseenter", function () {
						let subSubMenu = subItem.querySelector("ul");
						if (subSubMenu) {
							subSubMenu.style.display = "block";
						}
					});

					subItem.addEventListener("mouseleave", function () {
						let subSubMenu = subItem.querySelector("ul");
						if (subSubMenu) {
							subSubMenu.style.display = "none";
						}
					});
				});
			});

			// Tutup semua submenu saat mouse keluar dari menu utama
			document.querySelector(".main-menu").addEventListener("mouseleave", function () {
				menuItems.forEach(item => {
					let submenu = item.querySelector("ul");
					if (submenu) submenu.style.display = "none";
				});
			});
		});

		$(document).on('click', '.btn-registrasi', function () {
			var form = $('#form-registrasi');
			var url = form.attr('action')
			var type = form.attr('method')
			var formData = new FormData($('#form-registrasi')[0]);
			$.ajax({
				type: type,
				url: url,
				data: formData,
				enctype: 'multipart/form-data',
				dataType: "json",
				processData: false,
				contentType: false,
				beforeSend: function () {
					$('.btn-registrasi').html('Menyimpan..')
					$('.btn-registrasi').attr('disabled', true)
				},
				success: function (data) {
					$('.btn-registrasi').html('Simpan')
					$('.btn-registrasi').removeAttr('disabled')
					if (data.status) {
						Swal.fire({
							title: 'Success',
							text: data.text,
							icon: 'success',
							confirmButtonText: 'Tutup'
						}).then((result) => {
							if (result.isConfirmed) {
								if (data.url) {
									var isValidUrl = function (url) {
										try {
											new URL(url);
											return true;
										} catch (_) {
											return false;
										}
									}
									if (isValidUrl(data.url)) {
										window.location.href = data.url;
									} else {
										console.error('Invalid URL');
									}
								} else {
									$('#modal').modal('hide')
									$(".modal-backdrop").remove();
								}
							}
						})
					} else {

						if (data.errors) {
							var er = data.errors
							$.each(er, function (index, item) {
								$('#' + index.replace('[]', '')).addClass('is-invalid')
								$('#' + index.replace('[]', '') + 'label').html(item)
								$('#' + index.replace('[]', '') + 'label').show()
							})
						} else {
							Swal.fire({
								title: 'Error!',
								text: data.text,
								icon: 'error',
								confirmButtonText: 'Tutup'
							})
						}


					}
				},
				error: function (xhr) {
					$('.btn-submit').html('Simpan')
					$('.btn-submit').removeAttr('disabled')
					let message = '';
					message = '';
					$.each(xhr.responseJSON.errors, function (index, item) {
						message += item + '<br>';
					});
					Swal.fire({
						title: 'Error!',
						html: message.trim(),
						icon: 'error',
						confirmButtonText: 'Tutup'
					})
				}
			})
		})

		$(document).on('click', '.btn-login', function () {
			var form = $('#form-login');
			var url = form.attr('action')
			var type = form.attr('method')
			var formData = new FormData($('#form-login')[0]);
			$.ajax({
				type: type,
				url: url,
				data: formData,
				enctype: 'multipart/form-data',
				dataType: "json",
				processData: false,
				contentType: false,
				beforeSend: function () {
					$('.btn-login').html('Menyimpan..')
					$('.btn-login').attr('disabled', true)
				},
				success: function (data) {
					$('.btn-login').html('Simpan')
					$('.btn-login').removeAttr('disabled')
					if (data.status) {
						Swal.fire({
							title: 'Success',
							text: data.text,
							icon: 'success',
							confirmButtonText: 'Tutup'
						}).then((result) => {
							if (result.isConfirmed) {
								$('#modal').modal('hide')
								$(".modal-backdrop").remove();
								location.reload();
							}
						})
					} else {

						if (data.errors) {
							var er = data.errors

							// console.log(er)
							$.each(er, function (index, item) {
								$('#' + index.replace('[]', '')).addClass('is-invalid')
								$('#' + index.replace('[]', '') + 'label').html(item)
								$('#' + index.replace('[]', '') + 'label').show()
							})
						} else {
							Swal.fire({
								title: 'Error!',
								text: data.text,
								icon: 'error',
								confirmButtonText: 'Tutup'
							})
						}


					}
				},
				error: function (xhr) {
					$('.btn-login').html('Simpan')
					$('.btn-login').removeAttr('disabled')
					let message = '';
					message = '';
					$.each(xhr.responseJSON.errors, function (index, item) {
						message += item + '<br>';
					});
					Swal.fire({
						title: 'Error!',
						html: message.trim(),
						icon: 'error',
						confirmButtonText: 'Tutup'
					})
				}
			})
		})