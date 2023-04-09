import { useEffect } from 'react';
import AssBarComponent from '../../components/AssBarComponent';
import './styles/AssignmentPageStyle.css';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAssignmentDetailsAsync } from '../../redux/features/assignmentSlice';
import RegularAssignmentComponent from '../../components/StudentComponents/AssignmentPage/RegularAssignmentComponent';
import StudentPeerReviewComponent from '../../components/StudentComponents/AssignmentPage/StudentPeerReviewComponent';
import StudentHeaderBar from "../../components/StudentComponents/StudentHeaderBar";
import NavigationContainerComponent from "../../components/NavigationComponents/NavigationContainerComponent";

function StudentAssignmentPage() {
  const dispatch = useDispatch();
  const { courseId, assignmentId, assignmentType } = useParams();

  
  useEffect(() => {
    dispatch(getAssignmentDetailsAsync({ courseId, assignmentId }));
  }, [courseId, assignmentId, dispatch]);

  return (
    <div className="page-container">
      <StudentHeaderBar/>
      <div className='ap-container'>
        <NavigationContainerComponent/>
        <div className='ap-component'>
          {assignmentType === 'peer-review' ? (
              <StudentPeerReviewComponent />
          ) : (
              <RegularAssignmentComponent />
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentAssignmentPage;
