const Config = require("./config");
var stringMath = require("string-math");
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
	// intents: Object.keys(GatewayIntentBits).map((a)=>{
	// 	return GatewayIntentBits[a]
	// }),
});
const Prefix = "!!";

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setStatus("online");
	client.user.setActivity("Listening to $uicideboy$", { type: "LISTENING" });
});

function embed(title, message) {
	const e = new EmbedBuilder()
		.setColor("#fdfd96")
		.setTitle(title)
		.setDescription(message)
		.setFooter({ text: "beebot" });

	return e;
}

let timers = {};

async function SendMessage(ChannelID, message) {
	try {
		const channel = await client.channels.fetch(ChannelID);
		await channel.send(message);
	} catch (error) {
		console.error(`Failed to send message: ${error}`);
	}
}

// basic commands

// ping response

client.on("messageCreate", async (message) => {
	if (message.author.bot) return;

	if (message.mentions.has(client.user)) {
		return await SendMessage(message.channel.id, "yes?");
	}

	if (message.guild.id == "1187699080458145792" && message.channel.id != "1191688238046380052") return;

	if (!message.content.startsWith(Prefix)) return;

	// hello command

	if (message.content.startsWith("!!hello")) return await SendMessage(message.channel.id, "Hello!");

	// help command

	if (message.content.startsWith("!!help")) {
		return await SendMessage(
			message.channel.id,
			"all of my current commands can be found here: <https://docs.google.com/document/d/1xokFtmORSSH59nDOST4L80Yp-dr7DhMBP2_a-1Pz7N0/edit?usp=sharing>, or here's an invite to my discord, theres all sorts of info there. <https://discord.gg/P5Ca5WxkPH>"
		);
	}

	// favorite movie command

	if (message.content.startsWith("!!whats your favorite movie?")) {
		return await SendMessage(
			message.channel.id,
			'my favorite movie is: "No Country For Old Men", i think ive watched it about 16 times already.. if you want to read about it, here is a wikipedia link: <https://en.wikipedia.org/wiki/No_Country_for_Old_Men>'
		);
	}

	// ping command

	if (message.content.startsWith("!!womp")) {
		return await SendMessage(message.channel.id, "womp womp");
	}

	// meow command

	if (message.content.startsWith("!!meow")) {
		return await SendMessage(message.channel.id, "meow :3");
	}

	// i love you command (ily bee)

	if (message.content.startsWith("!!i love you")) {
		return await SendMessage(message.channel.id, "i love you too <3");
	}

	// emoji for nerds command

	if (message.content.startsWith("!!🤫🧏‍♂️")) {
		return await SendMessage(message.channel.id, "**fuck you, touch a woman**");
	}

	// playlists command

	if (message.content.startsWith("!!playlists")) {
		return await SendMessage(
			message.channel.id,
			"<https://open.spotify.com/playlist/0Nxz9XOflxkKpBTwS8WmVU?si=96088500eb644ba1> \n<https://open.spotify.com/playlist/3qKTJM8Bk0gk2vnCyDmyaL?si=641459e8f78f4dfc>"
		);
	}

	// are you single command

	if (message.content.startsWith("!!are you single?")) {
		return await SendMessage(message.channel.id, "i am yes!");
	}

	// favorite food command

	if (message.content.startsWith("!!whats your favorite food?")) {
		return await SendMessage(message.channel.id, "mossberg 590");
	}

	// favorite drink command

	if (message.content.startsWith("!!whats your favorite drink?")) {
		return await SendMessage(message.channel.id, "lemonade!");
	}

	// favorite song command

	if (message.content.startsWith("!!whats your favorite song?")) {
		return await SendMessage(
			message.channel.id,
			'currently my favorite song is: "O lord, I have my doubts" by the $uicideboy$!'
		);
	}

	// favorite color command

	if (message.content.startsWith("!!whats your favorite color?")) {
		return await SendMessage(message.channel.id, `yellow, and no, not for **that** reason.`);
	}

	// more "complex" commands

	// avatar command

	if (message.content.startsWith("!!avatar")) {
		if (message.mentions.users.size) {
			const taggedUser = message.mentions.users.first();
			return await SendMessage(
				message.channel.id,
				`${taggedUser.displayAvatarURL({ dynamic: true, size: 512 })}`
			);
		} else {
			return await SendMessage(
				message.channel.id,
				`${message.author.username}${message.author.displayAvatarURL()}`
			);
		}
	}

	// guild avatar command

	if (message.content.startsWith("!!gavatar")) {
		const member = message.mentions.members.first() || message.member;

		if (member) {
			const guildAvatarURL = member.displayAvatarURL({ dynamic: true, size: 512 });
			return message.channel.send(`${guildAvatarURL}`);
		} else {
			return message.channel.send("member not found");
		}
	}

	// timer command

	if (message.content.startsWith("!!timer")) {
		let id = message.author.id;
		if (timers[id]) {
			let now = Date.now();
			let difference = now - timers[id];
			timers[id] = null;

			return await SendMessage(message.channel.id, `timer stopped! - ${msToTime(difference)}`);
		} else {
			timers[id] = Date.now();
			return await SendMessage(message.channel.id, `timer started!`);
		}
	}

	// calculator command

	if (message.content.startsWith("!!calc")) {
		let expression = message.content.replace("!!calc ", "");
		if (expression.length == 0)
			return await SendMessage(message.channel.id, "the way you use the command is: !!calc 1+1, ect");
		let answer =
			"invalid argument:\nfor addition use +\nfor subtraction use -\nfor multiplication use *\nfor division use /";
		try {
			answer = stringMath(expression);
		} catch (e) {}

		return await SendMessage(message.channel.id, `${answer}`);
	}

	// hug command (should just ask tk, he gives good hugs ngl)

	if (message.content.startsWith("!!can i have a hug?")) {
		const options = ["hmm sure, *hugs*", "**no, take a fucking shower**"];
		const weights = [10, 90];

		return await SendMessage(message.channel.id, weighted_random(options, weights));
	}

	if (message.content.startsWith("!!will you marry me?")) {
		const options = ["i thought you would never ask! ||yes!||", "i thought you would never ask! ||**no!!**||"];
		const weights = [5, 95];

		return await SendMessage(message.channel.id, weighted_random(options, weights));
	}

	if (message.content.startsWith("!!whats a baby dog?")) {
		let Doggos = [
			"https://cdn.discordapp.com/attachments/1187707129205891102/1220075972188049489/IMG_4099.jpg?ex=660d9f4b&is=65fb2a4b&hm=c2bef4058148b580d7d7723c4098da2020d236c32507632050c6f447e8c4702f&",
			"https://cdn.discordapp.com/attachments/1187707129205891102/1220075914205859962/IMG_4413.jpg?ex=660d9f3d&is=65fb2a3d&hm=b73ce56b173342b683fa75f3c98fdbc8774270719089864afb8f133a4a28b194&",
			"https://cdn.discordapp.com/attachments/1187707129205891102/1220075781191893172/IMG_5528.jpg?ex=660d9f1e&is=65fb2a1e&hm=749f33b796502f87ace5cda31ec8e23c97559e11b32f845e942aeeb83d163703&",
			"https://cdn.discordapp.com/attachments/1187707129205891102/1220075768743333939/IMG_5529.jpg?ex=660d9f1b&is=65fb2a1b&hm=674001592a7af3f1b7183e61a0cc39108ea1831edf8f780a9f71f0e02b7bbb24&",
			"https://cdn.discordapp.com/attachments/1187707129205891102/1220075747331407942/IMG_5748.jpg?ex=660d9f16&is=65fb2a16&hm=a031ccc80a74d0b3d148cfdf454a2bb3db2b12f4dc9081ea2babcbac61aa9a29&",
			"https://cdn.discordapp.com/attachments/1187707129205891102/1220075734513746021/IMG_5752.jpg?ex=660d9f13&is=65fb2a13&hm=6a8607b4df220a4a5b779d4f22ebbc08f74e567248bacefe32ccaa13cf4f66f7&",
		];
		return await SendMessage(message.channel.id, Doggos[Math.floor(Math.random() * Doggos.length)]);
	}

	// rps command

	if (message.content.startsWith("!!rps")) {
		const choices = ["rock", "paper", "scissors"];
		const userChoice = message.content.split(" ")[1]?.toLowerCase();

		if (!userChoice || !choices.includes(userChoice)) {
			return await SendMessage(message.channel.id, "no dumbass, say 'rock', 'paper', or 'scissors'");
		}

		const botChoice = choices[Math.floor(Math.random() * choices.length)];
		const result = determineWinner(userChoice, botChoice);

		return await SendMessage(
			message.channel.id,
			`you chose: ${userChoice}\n I chose: ${botChoice}\n result: ${result}`
		);
	}

	return await SendMessage(message.channel.id, "i have no idea what you are saying, use !!help dumbass");
});

function determineWinner(userChoice, botChoice) {
	if (userChoice === botChoice) return "wowzers, it's a tie";

	let Win1 = userChoice === "rock" && botChoice === "scissors";
	let Win2 = userChoice === "paper" && botChoice === "rock";
	let Win3 = userChoice === "scissors" && botChoice === "paper";

	if (Win1 || Win2 || Win3) return "congratulations, you won against an ai :point_up: :nerd:";

	return "lmao, this dumbass lost";
}

function weighted_random(items, weights) {
	var i;

	for (i = 1; i < weights.length; i++) weights[i] += weights[i - 1];

	var random = Math.random() * weights[weights.length - 1];

	for (i = 0; i < weights.length; i++) if (weights[i] > random) break;

	return items[i];
}

function msToTime(duration) {
	var milliseconds = Math.floor((duration % 1000) / 100),
		seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60),
		hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	return hours + ":" + minutes + ":" + seconds;
}

// join message

client.on("guildMemberAdd", (member) => {
	const guild = member.guild;
	const welcomeChannel = guild.systemChannel;

	if (welcomeChannel) {
		const message = `welcome ${member} to ${guild.name}!`;
		welcomeChannel.send(message);
	}
});

// leave message

client.on("guildMemberRemove", (member) => {
	const guild = member.guild;
	const welcomeChannel = guild.systemChannel;

	if (welcomeChannel) {
		const message = `${member} has left ${guild.name}.`;
		welcomeChannel.send(message);
	}
});

client.login(Config.token);
