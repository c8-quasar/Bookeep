// Modo oscuro/claro (recuerda la elección)
// ==========================================
// CONFIGURACIÓN DEL TEMA
// ==========================================

(function () {

    // --------------------------------------
    // CARGAR TEMA GUARDADO
    // --------------------------------------

    let saved = 'dark';

    try {
        saved = localStorage.getItem('bk-theme') || 'dark';
    } catch (e) {
        // Mantener tema oscuro si falla el almacenamiento
    }

    // Aplicar tema al documento
    document.documentElement.setAttribute('data-bs-theme', saved);


    // --------------------------------------
    // CAMBIAR TEMA
    // --------------------------------------

    document.addEventListener('DOMContentLoaded', function () {

        const buttons = document.querySelectorAll('[data-theme-toggle]');

        buttons.forEach(function (btn) {

            btn.addEventListener('click', function () {

                const current = document.documentElement.getAttribute('data-bs-theme');

                const next = current === 'dark' ? 'light' : 'dark';

                // Aplicar nuevo tema
                document.documentElement.setAttribute('data-bs-theme', next);

                // Guardar preferencia
                try {
                    localStorage.setItem('bk-theme', next);
                } catch (e) {
                    // El tema seguirá funcionando aunque no pueda guardarse
                }

            });

        });

    });

})();
