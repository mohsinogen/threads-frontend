import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://mohsinogen-musical-broccoli-j954rq99445257v6-5000.preview.app.github.dev'
})

export function timeSince(dt) {

  const currentDate = new Date();
  const givenDate = new Date(dt);
  const timeDifference = currentDate - givenDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(weeks / 52);

  if (seconds < 60) {
    return 'now';
  } else if (minutes < 60) {
    if (minutes === 1) {
      return '1 m';
    } else {
      return `${minutes} m`;
    }
  } else if (hours < 24) {
    if (hours === 1) {
      return '1 h';
    } else {
      return `${hours} h`;
    }
  } else if (days < 7) {
    if (days === 1) {
      return '1 d';
    } else {
      return `${days} d`;
    }
  } else if (weeks < 52) {
    if (weeks === 1) {
      return '1 w';
    } else {
      return `${weeks} w`;
    }
  } else {
    if (years === 1) {
      return '1 y';
    } else {
      return `${years} y`;
    }
  }
}

export default Axios;