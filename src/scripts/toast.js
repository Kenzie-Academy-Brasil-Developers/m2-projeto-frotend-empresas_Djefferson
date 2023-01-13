export async function toast(text, color) {
    Toastify({
      text: text,
      duration: 3000,
      close: true,
      gravity: 'bottom',
      position: 'right',
      style: {
        background: color
      }
    }).showToast()
}