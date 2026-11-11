// ==========================================
// GESTIÓN DE SESIONES
// ==========================================

const BK = {

    // Consultar usuario activo
    user: function () {
        const usuario = sessionStorage.getItem('bk_user');

        try {
            return usuario ? JSON.parse(usuario) : null;
        } catch (error) {
            sessionStorage.removeItem('bk_user');
            return null;
        }
    },

    // Guardar usuario
    setUser: function (usuario) {
        sessionStorage.setItem('bk_user', JSON.stringify(usuario));
    },

    // Cerrar sesión
    logout: function () {
        sessionStorage.removeItem('bk_user');
    }

};


// ==========================================
// INICIO DE SESIÓN Y CONTROL DE ACCESO
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    const pagina = document.body.dataset.page;

    // --------------------------------------
    // LOGIN
    // --------------------------------------

    if (pagina === 'login') {

        // Si ya existe una sesión de administrador
        const usuario = BK.user();

        if (usuario && usuario.rol === 'admin') {
            location.replace('admin.html');
            return;
        }

        const form = document.getElementById('lf');
        const error = document.getElementById('err');

        form.addEventListener('submit', function (e) {

            e.preventDefault();

            const email = document.getElementById('e').value.trim();
            const pass = document.getElementById('p').value;

            let mensaje = '';
            let tipo = '';

            // Verificar campos vacíos
            if (email === '' || pass === '') {
                mensaje = 'Completa todos los campos.';
                tipo = 'alert-danger';
            }

            // Verificar formato del correo
            else if (!email.includes('@') || !email.includes('.')) {
                mensaje = 'Escribe un correo válido.';
                tipo = 'alert-danger';
            }

            // Verificar credenciales
            else if (
            email !== 'admin@biblioweb.test' ||
            pass !== 'Admin123'
            ) {
                mensaje = 'Usuario o contraseña incorrectos.';
                tipo = 'alert-warning';
            }

            // Mostrar mensaje
            error.textContent = mensaje;

            error.classList.remove(
                'd-none',
                'alert-danger',
                'alert-warning'
            );

            if (mensaje !== '') {
                error.classList.add('alert', tipo);
                return;
            }

            error.classList.add('d-none');

            // Crear sesión
            BK.setUser({
                email: email,
                rol: 'admin'
            });

            location.href = 'admin.html';

        });

    }


    // --------------------------------------
    // PANEL ADMINISTRATIVO
    // --------------------------------------

    else if (pagina === 'admin') {

        // Verificar sesión y permisos
        const usuario = BK.user();

        if (!usuario || usuario.rol !== 'admin') {
            location.replace('login.html');
            return;
        }

        // Cerrar sesión
        const logout = document.getElementById('logout');

        if (logout) {
            logout.addEventListener('click', function () {

                BK.logout();

                location.replace('index.html');

            });
        }

    }

});