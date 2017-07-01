       
class Logger(object):
    def __init__(self, logfileName):
        self.logfileName = logfileName

    def log(self, message):
        with open(self.logfileName, "w+") as f:
            f.write(message)
  