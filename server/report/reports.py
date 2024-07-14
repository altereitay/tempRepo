from flask import Blueprint, request, jsonify

reports_bp = Blueprint('report', __name__, url_prefix='/report')


@reports_bp.get('/reporter/<id>')
def get_by_reporter_id(id):
    from database.models import Report
    try:
        reports = Report.query.filter_by(reporter=id).all()
        if not reports:
            return jsonify({'data': 'No Reports Found'}), 200
        else:
            return jsonify(
                [{'reportId': report.reportId,
                  'reporter': report.reporter,
                  'location': report.location,
                  'data': report.data,
                  'image': report.image,
                  'reportedAt': report.reportedAt,
                  'isFixed': report.isFixed,
                  'lastUpdate': report.lastUpdate,
                  'tech': report.tech,
                  'techData': report.techData,
                  'disp': report.disp,
                  'dispData': report.dispData} for report in reports]), 200
    except Exception as e:
        return jsonify({'data': 'Server Error', 'error': str(e)}), 500
