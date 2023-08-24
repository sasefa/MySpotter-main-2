module.exports = {
    async headers() {
      return [
        {
          source: '/MySpotter/controllers/workoutController.js',
          headers: [
            {
              key: 'Content-Type',
              value: 'text/javascript',
            },
          ],
        },
      ];
    },
  };
  