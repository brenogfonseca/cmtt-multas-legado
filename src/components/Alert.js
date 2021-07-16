import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export function apareceAlertHistory(props) {
    var url = props.location.pathname
    var path = props.location.search
    var caminho = url + path
    return (window.location = caminho);
}

export function apareceAlertProtocolo(protocolo) {
    var prot, min, max, caminho, prot2, prot3, prot1
    min = 10000000;
    max = 99999999;
    prot2 = protocolo.replace(".", "")
    prot3 = prot2.replace(".", "").replace("-", "")
    prot1 = min + (Math.random() * (max - min))
    prot = "VAC-" + prot1 + "-" + prot3 + "-" + "2021"
    caminho = window.btoa(prot)
    return (window.location = "/Protocolo?" + caminho);
}

export function apareceAlert(props, cpfedit) {
    cpfedit = window.btoa(cpfedit)
    var caminho = "/CadastroCpf?" + cpfedit
    return (window.location = caminho);
}

export function apareceAlertContato() {
    var caminho = "/Cadastrar"
    return (window.location = caminho);
}