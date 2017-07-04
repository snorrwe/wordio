from .domain_base import DOMAINS
from .domains import users
from .domains import tiles
from .domains import games
from .domains import solutions

def get_domains():
	return dict((x.name, x.domain) for x in DOMAINS)
