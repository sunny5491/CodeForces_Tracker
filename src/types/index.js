const UserInfo = {
  handle: '',
  email: '',
  vkId: '',
  titlePhoto: '',
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  organization: '',
  contribution: 0,
  rank: '',
  rating: 0,
  maxRank: '',
  maxRating: 0,
  lastOnlineTimeSeconds: 0,
  registrationTimeSeconds: 0,
  friendOfCount: 0
};

const UserRating = {
  contestId: 0,
  contestName: '',
  handle: '',
  rank: 0,
  ratingUpdateTimeSeconds: 0,
  oldRating: 0,
  newRating: 0
};

const Problem = {
  contestId: 0,
  index: '',
  name: '',
  type: '',
  points: 0,
  tags: []
};

const UserSubmission = {
  id: 0,
  contestId: 0,
  creationTimeSeconds: 0,
  relativeTimeSeconds: 0,
  problem: Problem,
  author: {
    contestId: 0,
    members: [{ handle: '' }],
    participantType: '',
    ghost: false,
    startTimeSeconds: 0
  },
  programmingLanguage: '',
  verdict: '',
  testset: '',
  passedTestCount: 0,
  timeConsumedMillis: 0,
  memoryConsumedBytes: 0
};
