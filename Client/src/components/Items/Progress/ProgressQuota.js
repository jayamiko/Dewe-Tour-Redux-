import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

// Example component that utilizes the `normalise` function at the point of render.
function Progress({value, maxQuota}) {
  let MIN = 0;
  let MAX = maxQuota;
  const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);
  return (
    <div>
      <LinearProgress
        color="warning"
        variant="determinate"
        value={normalise(value)}
      />
    </div>
  );
}

export default Progress;
