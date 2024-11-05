import React from "react";

function getAvatarUrl(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=64`;
}

export default function UserAvatar({ name }) {
  const avatarUrl = getAvatarUrl(name);

  return <img className="rounded-full h-12" src={avatarUrl} alt={`${name}'s avatar`} />;
}