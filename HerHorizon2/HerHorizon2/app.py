from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


# Landing Page
@app.route('/')
def home():
    return render_template('index.html')


# Assessment Page
@app.route('/assessment')
def assessment():
    return render_template('assessment.html')


# Receive Assessment Data
@app.route('/submit-assessment', methods=['POST'])
def submit_assessment():

    try:

        data = request.get_json()

        print("\n========== HERHORIZON ASSESSMENT DATA ==========")

        for key, value in data.items():
            print(f"{key}: {value}")

        print("================================================\n")

        return jsonify({
            "success": True,
            "message": "Assessment data received successfully!"
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 400


if __name__ == '__main__':
    app.run(debug=True)