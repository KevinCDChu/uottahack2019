from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from urlparse import parse_qs
import SocketServer
import json as simplejson
import random
import cgi

facebook = 0
twitter = 0
reddit = 0
youtube = 0
netflix = 0

class S(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        self._set_headers()
        global facebook
        global twitter
        global reddit
        global youtube
        global netflix
        print '{"data":['+str(facebook+twitter+reddit+youtube+netflix)+','+str(facebook)+','+str(twitter)+','+str(reddit)+','+str(youtube)+','+str(netflix)+']}'
        self.wfile.write('{"data":['+str(facebook+twitter+reddit+youtube+netflix)+','+str(facebook)+','+str(twitter)+','+str(reddit)+','+str(youtube)+','+str(netflix)+']}')

    def do_HEAD(self):
        self._set_headers()

    def do_POST(self):
        self.send_response(200)
        self.end_headers()

        ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
        if ctype == 'multipart/form-data':
            postvars = cgi.parse_multipart(self.rfile, pdict)
        elif ctype == 'application/x-www-form-urlencoded':
            length = int(self.headers.getheader('content-length'))
            postvars = cgi.parse_qs(self.rfile.read(length), keep_blank_values=1)
        else:
            postvars = {}

        global facebook
        global twitter
        global reddit
        global youtube
        global netflix
        if postvars['platform'][0] == 'facebook' :
            facebook+=int(postvars['seconds'][0])
        elif postvars['platform'][0] == 'twitter' :
            twitter+=int(postvars['seconds'][0])
        elif postvars['platform'][0] == 'reddit' :
            reddit+=int(postvars['seconds'][0])
        elif postvars['platform'][0] == 'youtube' :
            youtube+=int(postvars['seconds'][0])
        elif postvars['platform'][0] == 'netflix' :
            netflix+=int(postvars['seconds'][0])
        print postvars
        self.wfile.write("testing")


def run(server_class=HTTPServer, handler_class=S, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print 'Server running on port 8000'
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

if len(argv) == 2:
    run(port=int(argv[1]))
else:
    run()