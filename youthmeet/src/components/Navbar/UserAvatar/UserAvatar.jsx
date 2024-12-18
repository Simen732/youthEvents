import React from "react";
import UserAvatarHash from "../UserAvatar/UserAvatarHash/UserAvatarHash"

function getAvatarUrl(name) {
  const backgroundColor = UserAvatarHash(name);
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${backgroundColor.substring(1)}&color=000&size=64`;
}

export default function UserAvatar({ name }) {
  const avatarUrl = getAvatarUrl(name);

  return <img className="rounded-full h-12" src={avatarUrl} alt={`${name}'s avatar`} />;
}