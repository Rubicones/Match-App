import sys

from flask import Flask, request, make_response

import requests


class backend:
    app_: Flask
    api_key_: str

    def __init__(self, api_key: str):
        self.api_key_ = api_key

        app = Flask(__name__)

        @app.route('/authentication', methods=["GET"])
        def auth():
            resp = requests.get(
                f"https://api.themoviedb.org/3/authentication/guest_session/new?api_key={self.api_key_}")
            if resp.ok:
                return make_response("Authorized", 200)
            return make_response("Try again later", 401)

        @app.route('/search', methods=["GET"])
        def search():
            resp = requests.get(
                f"https://api.themoviedb.org/3/search/movie?api_key={self.api_key_}"
                f"&language=en-US&query={request.args.get('query')}&page=1&include_adult=false")
            if resp.ok:
                return make_response(resp.json(), 200)
            return make_response("bad request", 400)

        @app.route('/movie', methods=["GET"])
        def movie():
            resp = requests.get(
                f"https://api.themoviedb.org/3/movie/{request.args.get('movieID')}/"
                f"credits?api_key={self.api_key_}&language=en-US")
            if resp.ok:
                return make_response(resp.json(), 200)
            return make_response("bad request", 400)

        self.app_ = app

    def run(self):
        self.app_.run()


if __name__ == "__main__":
    print(sys.argv[1])
    app = backend(str(sys.argv[1]))
    app.run()
