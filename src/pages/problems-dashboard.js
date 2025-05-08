import React, { useState } from 'react';

import Head from 'next/head';

import { useQuery } from '@apollo/client';
import SelectFilter from 'components/Filters';
import getSeverityEnumQuery, { getSourceOptions } from 'components/Filters/helpers';
import ProblemsByIdentifier from 'components/ProblemsByIdentifier';
import MainLayout from 'layouts/MainLayout';
import AllProblemsQuery from 'lib/query/AllProblems';
import withQueryErrorNoHeader from 'lib/withQueryErrorNoHeader';
import withQueryLoadingNoHeader from 'lib/withQueryLoadingNoHeader';
import * as R from 'ramda';

import { ProblemDashboardFilterWrapper, ProblemsDashBoardWrapper } from '../styles/pageStyles';

/**
 * Displays the problems overview page.
 *
 */
const ProblemsDashboardPage = () => {
    const [source, setSource] = useState([]);
    const [severity, setSeverity] = useState(['CRITICAL']);
    const [envType, setEnvType] = useState('PRODUCTION');

    const { data: severities, loading: severityLoading } = useQuery(getSeverityEnumQuery);
    const { data: sources, loading: sourceLoading } = useQuery(getSourceOptions);
    const { data, loading, error } = useQuery(AllProblemsQuery, {
        variables: { source, severity, envType },
    });

    const handleEnvTypeChange = (envType) => setEnvType(envType.value);
    const handleSourceChange = (source) => {
        let values = source?.map(s => s.value) || [];
        setSource(values);
    };
    const handleSeverityChange = (severity) => {
        let values = severity?.map(s => s.value) || [];
        setSeverity(values);
    };

    const sourceOptions = sources => {
        return sources && sources.map(s => ({ value: s, label: s }));
    };

    const severityOptions = enums => {
        return enums && enums.map(s => ({ value: s.name, label: s.name }));
    };

    const groupByProblemIdentifier = (problems) =>
        problems?.reduce((arr, problem) => {
            arr[problem.identifier] = arr[problem.identifier] || [];
            arr[problem.identifier].push(problem);
            return arr;
        }, {});

    const ComposedComponent = R.compose(
        withQueryLoadingNoHeader,
        withQueryErrorNoHeader
    )(({ data: { problems } }) => {
        const problemsById = groupByProblemIdentifier(problems);
        const problemIdentifiers = Object.keys(problemsById || {}).map(p => {
            const problem = problemsById[p][0];
            return {
                identifier: p,
                source: problem.source,
                severity: problem.severity,
                problems: problemsById[p],
            };
        });

        const critical = problems?.filter(p => p.severity === 'CRITICAL').length || 0;
        const high = problems?.filter(p => p.severity === 'HIGH').length || 0;
        const medium = problems?.filter(p => p.severity === 'MEDIUM').length || 0;
        const low = problems?.filter(p => p.severity === 'LOW').length || 0;

        return (
            <ProblemsDashBoardWrapper>
                <div className="content">
                    <div className="overview">
                        <ul className="overview-list">
                            <li className="result"><label>Results: </label>{problems?.length} Problems</li>
                            <li className="result"><label>Critical: </label>{critical}</li>
                            <li className="result"><label>High: </label>{high}</li>
                            <li className="result"><label>Medium: </label>{medium}</li>
                            <li className="result"><label>Low: </label>{low}</li>
                        </ul>
                        <ul className="overview-list">
                            <li className="result"><label>Showing: </label>{envType.charAt(0).toUpperCase() + envType.slice(1).toLowerCase()} environments</li>
                        </ul>
                    </div>
                    <ProblemsByIdentifier problems={problemIdentifiers} />
                </div>
            </ProblemsDashBoardWrapper>
        );
    });

    return (
        <>
            <Head>
                <title>Problems Dashboard</title>
            </Head>
            <MainLayout>
                <ProblemDashboardFilterWrapper>
                    <h2>Problems Dashboard By Identifier</h2>
                    <div className="filters">
                        <SelectFilter
                            title="Source"
                            loading={sourceLoading}
                            options={sources && sourceOptions(sources.sources)}
                            onFilterChange={handleSourceChange}
                            isMulti
                        />
                        <SelectFilter
                            title="Severity"
                            loading={severityLoading}
                            options={severities && severityOptions(severities.__type.enumValues)}
                            defaultValue={{ value: 'CRITICAL', label: 'CRITICAL' }}
                            onFilterChange={handleSeverityChange}
                            isMulti
                        />
                        <SelectFilter
                            title="Type"
                            defaultValue={{ value: 'PRODUCTION', label: 'Production' }}
                            options={[
                                { value: 'PRODUCTION', label: 'Production' },
                                { value: 'DEVELOPMENT', label: 'Development' },
                            ]}
                            onFilterChange={handleEnvTypeChange}
                        />
                    </div>
                </ProblemDashboardFilterWrapper>
                <ComposedComponent loading={loading} error={error} data={data} />
            </MainLayout>
        </>
    );
};

export default ProblemsDashboardPage;