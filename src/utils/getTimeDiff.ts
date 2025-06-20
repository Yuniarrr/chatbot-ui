const getTimeDiff = (
  startTime: string,
  endTime: string,
): { menitDetik: string; mmss: string } => {
  const start = new Date(startTime.replace(" ", "T"));
  const end = new Date(endTime.replace(" ", "T"));

  const diffMs = end.getTime() - start.getTime();
  const totalSeconds = Math.floor(diffMs / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {
    menitDetik: `${minutes} menit ${seconds} detik`,
    mmss: `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
  };
};

export default getTimeDiff;
