// Seleção de elementos
const display = document.getElementById('displayTempo');
const btnIniciar = document.getElementById('btnIniciar');
const btnPausar = document.getElementById('btnPausar');
const btnZerar = document.getElementById('btnZerar');
const btnModoEscuro = document.getElementById('btnModoEscuro');
const inputMinutos = document.getElementById('minutosInput');
const inputSegundos = document.getElementById('segundosInput');
// Variáveis de controle
let totalSegundos = 0;
let tempoInicial = 0; // Guarda o tempo inicial para reinício automático
let intervalo = null;
let rodando = false;
const alertaSom = new Audio('alerta.mp3'); // Certifique-se de que alerta.mp3 está na mesma pasta
// Desbloqueio de autoplay para navegadores modernos
let audioDesbloqueado = false;
function desbloquearAudio() {
	if (!audioDesbloqueado) {
		alertaSom.play().then(() => {
			alertaSom.pause();
			alertaSom.currentTime = 0;
			audioDesbloqueado = true;
		}).catch(() => {});
	}
}
btnIniciar.addEventListener('click', desbloquearAudio, { once: true });
// Atualiza o display
function atualizarDisplay() {
 const minutos = Math.floor(totalSegundos / 60);
 const segundos = totalSegundos % 60;
 display.textContent =
`${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2,'0')}`;
 console.log('⏱️ Display atualizado:', display.textContent);
}
// Iniciar temporizador
function iniciar() {
 if (rodando) return;
 // Pegando valores dos inputs
 const min = parseInt(inputMinutos.value) || 0;
 const seg = parseInt(inputSegundos.value) || 0;
 // Validação de inputs
 if (min < 0 || seg < 0 || seg > 59) {
 alert('⚠️ Insira valores válidos: minutos >= 0 e segundos entre 0 e 59');
 return;
 }
 totalSegundos = min * 60 + seg;
 if (totalSegundos <= 0) {
 alert('Insira um tempo válido!');
 return;
 }
 tempoInicial = totalSegundos; // Guarda o tempo inicial
 rodando = true;
 atualizarDisplay();
 intervalo = setInterval(() => {
	 if (totalSegundos > 0) {
		 totalSegundos--;
		 atualizarDisplay();
	 }
	 if (totalSegundos === 0) {
		 clearInterval(intervalo);
		 rodando = false;
			 alertaSom.currentTime = 0;
			 alertaSom.play().catch((e) => {
				 setTimeout(() => alertaSom.play().catch(()=>{}), 200);
			 }); // Tenta tocar o som
			 alert('⏰ Tempo encerrado!');
		 // Se quiser reiniciar automaticamente, descomente as linhas abaixo:
		 // totalSegundos = tempoInicial;
		 // rodando = true;
		 // intervalo = setInterval(arguments.callee, 1000);
		 atualizarDisplay();
	 }
 }, 1000);
}
// Pausar temporizador
function pausar() {
 if (!rodando) return;
 clearInterval(intervalo);
 rodando = false;
 console.log('⏸️ Temporizador pausado');
}
// Resetar temporizador
function zerar() {
 clearInterval(intervalo);
 totalSegundos = 0;
 rodando = false;
 atualizarDisplay();
 console.log('🔄 Temporizador resetado');
 function tempoEsgotado() {
console.log('🎯 Tempo esgotado! Executando ações finais...');
// Parar o intervalo
clearInterval(intervalo);
rodando = false;
containerTemporizador.classList.remove('temporizador-ativo');
// 🔔 TOCAR SOM DE ALERTA
console.log('🔊 Tocando alerta sonoro...');
alertaSom.play().catch(error => {
console.log('❌ Erro ao tocar som:', error);
// Fallback: se o som falhar, mostra mensagem no console
});
// Mostrar alerta visual
alert('⏰ TEMPO ESGOTADO!\n\nO temporizador chegou a zero.');
console.log('✅ Ações de tempo esgotado concluídas');
}
}
// Alternar modo escuro
btnModoEscuro.addEventListener('click', () => {
 document.body.classList.toggle('modo-escuro');
});
// Event listeners
btnIniciar.addEventListener('click', iniciar);
btnPausar.addEventListener('click', pausar);
btnZerar.addEventListener('click', zerar);
// Inicializa display
atualizarDisplay();

