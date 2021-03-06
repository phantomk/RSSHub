const utils = require('./utils');

module.exports = async (ctx) => {
    const id = ctx.params.id;
    const result = await utils.getTwit().get('statuses/user_timeline', {
        screen_name: id,
        tweet_mode: 'extended',
    });
    const data = result.data;
    const userInfo = data[0].user;
    const profileImageUrl = userInfo.profile_image_url || userInfo.profile_image_url_https;

    ctx.state.data = {
        title: `${userInfo.name} 的 Twitter`,
        link: `https://twitter.com/${id}/`,
        image: profileImageUrl,
        description: userInfo.description,
        item: utils.ProcessFeed({
            data,
        }),
    };
};
