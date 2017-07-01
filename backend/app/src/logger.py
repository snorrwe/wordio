import time

LogLevel = {
	'none': 0
	, 'error': 1
	, 'warn': 2
	, 'info': 3 
	, 'debug': 4 
}       

class LogService(object):
    def __init__(self, logfileName, logLevel = LogLevel['debug']):
        self.logfileName = logfileName
        self.logLevel = logLevel

    def log(self, message):
        with open(self.logfileName, "a") as f:
            f.write(message + "\n\n")

    def timed_log(self, message):
    	self.log(time.asctime() + " - " + message)

    def debug(self, message):
    	if(self.logLevel >= LogLevel['debug']):
    		self.timed_log("DEBUG: %s" % message)

    def info(self, message):
    	if(self.logLevel >= LogLevel['info']):
    		self.timed_log("INFO: %s" % message)

    def warn(self, message):
    	if(self.logLevel >= LogLevel['warn']):
    		self.timed_log("WARN: %s" % message)

    def errpr(self, message):
    	if(self.logLevel >= LogLevel['errpr']):
    		self.timed_log("ERROR: %s" % message)
