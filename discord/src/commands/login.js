const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const { logger } = require('../utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('login')
        .setDescription('Log into the bot'),

    /** @param {ChatInputCommandInteraction} interaction */
    async execute(interaction) {
        try {
            const url = 'https://accounts.google.com/o/oauth2/v2/auth' +
                '?access_type=offline' +
                `&client_id=${process.env.CLIENT_ID}` +
                `&redirect_uri=${process.env.URL}/bot/auth` +
                '&response_type=code' +
                '&scope=email%20openid%20profile';

            interaction.reply(`You are not logged in! Please [click here](${url}) to log in.`);

        } catch (err) {
            logger.error(err.stack);
        }
    }
};
