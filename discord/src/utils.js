const decode = require('jwt-decode');
const { createLogger, format, transports } = require('winston');
const axios = require('axios');
const { combine, timestamp, colorize, printf } = format;

module.exports = {
    logger: createLogger({
        level: 'debug',
        format: combine(
            timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
            colorize({ colors: { info: 'cyan', error: 'red', warn: 'yellow', debug: 'gray' }}),
            printf(({ level, message, timestamp }) => {
                return `${timestamp} [ ${level} ] ${message}`;
            })
        ),
        transports: [
            new transports.Console()
        ]
    }),

    authenticate: async (interaction) => {
        const auth = { headers: {}, roles: [], courseId: '' };
        const token = interaction.client.accounts.get(interaction.user.id);

        auth.headers = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        let isValid = true;

        await axios
            .get('http://login:13126/auth/token/generate', auth.headers)
            .then((res) => {
                return res.data.find(course => course.course_name === interaction.guild.name).course_id;
            })
            .catch((err) => {
                if (err.status === 401) { isValid = false; }
            });

        if (!token || !isValid) {
            const url = 'https://accounts.google.com/o/oauth2/v2/auth' +
                '?access_type=offline' +
                `&client_id=${process.env.CLIENT_ID}` +
                `&redirect_uri=${process.env.URL}/bot/auth` +
                '&response_type=code' +
                '&scope=email%20openid%20profile';

            throw new Error(`You are not logged in! Please [click here](${url}) to log in.`);
        }

        auth.roles = decode(token).groups;
        auth.courseId = interaction.guild.name;

        return auth;
    },
};
