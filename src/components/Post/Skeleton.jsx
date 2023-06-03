import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={300}
    height={250}
    viewBox="0 0 300 250"
    backgroundColor="#c2d65c"
    foregroundColor="#c2c4ab"
    {...props}
  >
    <rect x="0" y="292" rx="10" ry="10" width="260" height="19" /> 
    <rect x="0" y="328" rx="10" ry="10" width="260" height="46" /> 
    <rect x="0" y="395" rx="10" ry="10" width="101" height="25" /> 
    <rect x="115" y="390" rx="20" ry="20" width="144" height="35" /> 
    <rect x="55" y="170" rx="0" ry="0" width="244" height="17" /> 
    <rect x="55" y="195" rx="0" ry="0" width="86" height="14" /> 
    <rect x="55" y="219" rx="0" ry="0" width="120" height="14" /> 
    <rect x="190" y="219" rx="0" ry="0" width="108" height="14" /> 
    <circle cx="25" cy="190" r="20" /> 
    <rect x="0" y="0" rx="10" ry="10" width="300" height="160" />
  </ContentLoader>
)

export default Skeleton