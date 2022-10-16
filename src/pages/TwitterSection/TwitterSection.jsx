import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Card } from "../../molecules";
import TwitterIcon from "@mui/icons-material/Twitter";
import { TwitterTweetEmbed } from "react-twitter-embed";

const TwitterSection = ({ data }) => {
  let tweet_data = data[0].tweet_data.slice(0, 3);

  let average_likes = 0,
    average_retweets = 0,
    average_replies = 0;

  if (data[0].tweet_data.length) {
    data[0].tweet_data.forEach((tweet, i) => {
      average_likes += parseInt(tweet.public_metrics.like_count);
      average_retweets += parseInt(tweet.public_metrics.retweet_count);
      average_replies += parseInt(tweet.public_metrics.reply_count);
    });

    average_likes = parseInt(average_likes / data[0].tweet_data.length);
    average_retweets = parseInt(average_retweets / data[0].tweet_data.length);
    average_replies = parseInt(average_replies / data[0].tweet_data.length);
  }

  // console.log(average_likes,average_replies, average_retweets)

  return (
    <Box marginBottom={5} id="twitter-section">
      <Box>
        <Typography sx={{ fontSize: {xs: 21, md: 25}, marginBottom: 2, textAlign: {xs: "center", md: "left"} }}>Twitter Overview</Typography>
        <Box display="flex" justifyContent="space-around" sx={{flexDirection: {xs: "column", sm: "row"}, alignItems: {xs: "center", sm: "normal"}}}>
          <Card
            first="Followers"
            Icon={<TwitterIcon sx={{ color: "#1DA1F2" }} />}
            second={data[0].followers_count}
          />
          <Card
            first="Tweets"
            Icon={<TwitterIcon sx={{ color: "#1DA1F2" }} />}
            second={data[0].tweet_count}
          />
        </Box>
      </Box>
      {data[0].tweet_data.length && (
        <Box marginTop={4}>
          <Typography sx={{ fontSize: {xs: 21, md: 25}, marginBottom: 2, textAlign: {xs: "center", md: "left"} }}>
            Last {data[0].tweet_data.length} tweets summary
          </Typography>
          <Box display="flex" sx={{flexDirection: {xs: "column", md: 'row'}, justifyContent: "space-around", alignItems: {xs: "center"}}}>
            <Card first="Likes" second={average_likes} />
            <Card first="Retweets" second={average_retweets} />
            <Card first="Replies" second={average_replies} />
          </Box>
        </Box>
      )}
      {tweet_data.length && (
        <Box marginTop={4}>
          <Typography sx={{ fontSize: {xs: 21, md: 25}, marginBottom: 1, textAlign: {xs: "center", md: "left"} }}>Recent Tweets</Typography>
          <Box display="flex" justifyContent="center" flexDirection={{xs: "column", md:"row"}}>
            {tweet_data.map((tweet) => (
              <Box
                key={tweet._id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: 'space-between',
                  alignItems: {xs: "center", md: "normal"},
                  // padding: "25px 50px",
                  margin: 2,
                  width: {md: "270px", lg:"100%"},
                  borderRadius: 2,
                }}
              >
                <TwitterTweetEmbed
                  tweetId={tweet._id}
                  onLoad={() => {
                    let item = document.querySelector(
                      `[data-tweet-id="${tweet._id}"]`
                    );

                    item.setAttribute(
                      "src",
                      item
                        .getAttribute("src")
                        .replace("theme=light", "theme=dark")
                    );
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TwitterSection;

const styles = {
  section: {
    fontSize: "18px",
    color: "#292b2c",
    backgroundColor: "#fff",
    padding: "0 20px",
  },
  wrapper: {
    textAlign: "center",
    margin: "0 auto",
    marginTop: "50px",
  },
};
