import React from 'react';
import {
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryTooltip,
    VictoryGroup
} from 'victory';

const barChart = (props) => {

    const ratings = props.ratings;

    const averages = ratings
        .map(rating => rating.assignmentId)
        .filter((rating, index, ratings) => ratings.indexOf(rating) === index)
        .map(assignmentId => {
            const ratingsPerAssignment = ratings.filter(rating => rating.assignmentId === assignmentId);
            return {
                assignmentId: assignmentId,
                funRating: ratingsPerAssignment.reduce((prev, curr) => prev + curr.funRating, 0) / ratingsPerAssignment.length,
                difficultyRating: ratingsPerAssignment.reduce((prev, curr) => prev + curr.difficultyRating, 0) / ratingsPerAssignment.length
            }
        });

    console.log(averages);

    const ratingsWithLabels = ratings.map(rating => {

        const avg = averages.filter(average => average.assignmentId === rating.assignmentId)[0];

        return {
            assignmentId: rating.assignmentId,
            difficultyRating: avg.difficultyRating,
            funRating: avg.funRating,
            label: `Opdracht ${rating.assignmentId},
                    funRating: ${avg.funRating.toFixed(1)},
                    difficultyRating: ${avg.difficultyRating.toFixed(1)}`
        };
    });

    return (
        <div
            style={{width: 500, height: 300}}>
            <VictoryChart
                theme={VictoryTheme.material}
            >
                <VictoryGroup>
                    <VictoryBar
                        data={ratingsWithLabels}
                        x="assignmentId"
                        y="funRating"
                        barWidth={20}
                        alignment={"end"}
                        labelComponent={<VictoryTooltip />}
                    ></VictoryBar>
                    <VictoryBar
                        data={ratingsWithLabels}
                        x="assignmentId"
                        y="difficultyRating"
                        barWidth={20}
                        alignment={"start"}
                        labelComponent={<VictoryTooltip />}
                    ></VictoryBar>
                </VictoryGroup>
            </VictoryChart>
        </div>
    );

};

export default barChart;
