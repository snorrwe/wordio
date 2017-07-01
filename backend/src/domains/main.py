from .domain_base import DOMAINS
from .domains import users

def get_domain():
	return dict((x.name, x.domain) for x in DOMAINS)
