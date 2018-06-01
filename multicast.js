const dgram = require("dgram");
const process = require("process");

const PORTA = 5555;
const ENDERECO_MULTICAST = "233.255.255.255";

const socket = dgram.createSocket({type: "udp4", reuseAddr: true});
socket.bind(PORTA);


module.exports = {
	//enviando mensagens
	ouvirMensagens: function () {
		socket.on("listening", function() {
			socket.addMembership(ENDERECO_MULTICAST);
			setInterval(enviarMensagem, 2000); //para teste
			const endereco = socket.address();
			console.log(`Socket UDP escutando em ${endereco.address}:${endereco.port} pid: ${process.pid} `);
		});
	},

	//recebendo mensagens
	receberMensagens: function (mensagem, informacao) {
		socket.on("message", function(mensagem, informacao) {
			console.info(`Mensagem vinda de: ${informacao.address}:${informacao.port} ... ${mensagem}`);
		});
	},
}


var enviarMensagen = function () {
	const mensagem = Buffer.from(`Mensagem do processo: ${process.pid}`);
	socket.send(mensagem,0,mensagem.length,PORTA,ENDERECO_MULTICAST,function() {
		console.info(`Enviando mensagem... "${mensagem}"`);
	});
}



