import { Skeleton as MuiSkeleton } from "@mui/material"

const Skeleton = ({ width, height }: { width: number; height: number }) => {
  return <MuiSkeleton width={width} height={height} />
}

export default Skeleton
